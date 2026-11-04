import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { test } from "node:test";
import ts from "typescript";

const project = process.cwd();

// Exercise the source hooks without adding a browser or React testing dependency.
function sourceLoader(mocks = {}, globals = {}) {
  const cache = new Map();
  function load(specifier) {
    if (specifier in mocks) return mocks[specifier];
    if (cache.has(specifier)) return cache.get(specifier);
    const base = path.join(project, "src", specifier.slice(2));
    const filename = [base + ".ts", base + ".tsx", path.join(base, "index.ts")].find(fs.existsSync);
    assert.ok(filename, `Unresolved source module: ${specifier}`);
    const loaded = { exports: {} };
    cache.set(specifier, loaded.exports);
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    vm.runInNewContext(output, { module: loaded, exports: loaded.exports, require: load, URL, ...globals }, { filename });
    return loaded.exports;
  }
  return load;
}

function events() {
  const handlers = new Map();
  return {
    handlers,
    addEventListener(name, fn) { handlers.set(name, fn); },
    removeEventListener(name, fn) { if (handlers.get(name) === fn) handlers.delete(name); },
    emit(name, event) { handlers.get(name)?.(event); },
  };
}

test("shared scene lifecycle batches frames, pauses offscreen/reduced motion, and cleans up on remount", () => {
  let effect, intersection, activity, resize, nextFrame = 0, setups = 0, cleanups = 0;
  const frames = new Map();
  const calls = [];
  const browser = events();
  const page = { ...events(), hidden: false };
  const motion = { ...events(), matches: false };
  const compact = { ...events(), matches: false };
  browser.matchMedia = query => query.includes("reduced-motion") ? motion : query === "(max-width: 700px)" ? { ...events(), matches: false } : compact;
  const viewport = { offsetHeight: 700 };
  const progressLabel = { textContent: "0" };
  const liveRegion = { live: "polite", setAttribute(_, value) { this.live = value; } };
  let sectionTop = 0;
  const properties = new Map();
  const progressIndicator = { style: { getPropertyValue: key => properties.get(key) ?? "", setProperty: (key, value) => properties.set(key, value) } };
  const root = {
    ...events(), dataset: {},
    querySelector: selector => selector === "[data-scene-progress-label]" ? progressLabel : selector === "[data-mobile-scene-progress]" ? progressIndicator : viewport, querySelectorAll: () => [liveRegion],
    offsetHeight: 3500, getBoundingClientRect: () => ({ top: sectionTop }),
    style: { setProperty: () => assert.fail("Progress must not invalidate styles throughout the scene") },
  };
  const observers = [];
  const load = sourceLoader({ react: {
    useRef: () => ({ current: root }),
    useEffect: fn => { effect = fn; },
  } }, {
    window: browser,
    document: page,
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class {
      constructor(callback, options) {
        if (options?.rootMargin) { activity = callback; assert.equal(options.rootMargin, "200px 0px"); }
        else intersection = callback;
        observers.push(this);
      }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
    ResizeObserver: class {
      constructor(callback) { resize = callback; observers.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
  });
  load("@/hooks/use-scroll-scene").useScrollScene("[data-viewport]", () => {
    setups++;
    return { update: reduced => calls.push(reduced), cleanup: () => cleanups++ };
  });
  for (let mount = 0; mount < 2; mount++) {
    const cleanup = effect();
    assert.equal(calls.at(-1), false);
    assert.equal(liveRegion.live, "off");
    assert.equal(root.dataset.sceneActive, "false");
    assert.equal(browser.handlers.has("scroll"), false);
    browser.emit("scroll"); resize(); assert.equal(frames.size, 0);
    activity([{ isIntersecting: true }]);
    intersection([{ isIntersecting: true }]);
    assert.equal(root.dataset.sceneActive, "true");
    sectionTop = -1400;
    browser.emit("scroll"); browser.emit("scroll"); resize();
    assert.equal(frames.size, 1);
    const pending = [...frames.values()][0]; frames.clear(); pending();
    assert.equal(calls.at(-1), false);
    sectionTop = -3000;
    intersection([{ isIntersecting: false }]);
    activity([{ isIntersecting: false }]);
    assert.equal(root.dataset.sceneActive, "false");
    assert.equal(browser.handlers.has("scroll"), false);
    assert.equal(liveRegion.live, "off");
    browser.emit("scroll"); resize();
    assert.equal(frames.size, 0);
    sectionTop = 100;
    activity([{ isIntersecting: true }]);
    intersection([{ isIntersecting: true }]);
    assert.equal(liveRegion.live, "polite");
    browser.emit("scroll"); assert.equal(frames.size, 1);
    const beforeHiding = calls.length;
    page.hidden = true; page.emit("visibilitychange");
    assert.equal(frames.size, 0);
    assert.equal(root.dataset.sceneActive, "false");
    assert.equal(browser.handlers.has("scroll"), false);
    assert.equal(liveRegion.live, "off");
    browser.emit("scroll"); resize();
    assert.equal(calls.length, beforeHiding);
    page.hidden = false; page.emit("visibilitychange");
    assert.equal(root.dataset.sceneActive, "true");
    assert.equal(liveRegion.live, "polite");
    assert.equal(calls.length, beforeHiding + 1);
    motion.matches = true; motion.emit("change");
    assert.equal(calls.at(-1), true);
    assert.equal(browser.handlers.has("scroll"), false);
    motion.matches = false; motion.emit("change");
    assert.equal(browser.handlers.has("scroll"), true);
    compact.matches = true; compact.emit("change");
    assert.equal(calls.at(-1), true);
    assert.equal(browser.handlers.has("scroll"), false);
    compact.matches = false; compact.emit("change");
    browser.emit("scroll"); assert.equal(frames.size, 1);
    cleanup();
    assert.equal(frames.size, 0);
    assert.equal(browser.handlers.size, 0);
    assert.equal(page.handlers.size, 0);
    assert.equal(root.dataset.sceneActive, undefined);
    assert.equal(motion.handlers.size, 0);
    assert.equal(compact.handlers.size, 0);
    assert.equal(liveRegion.live, "polite");
    assert.ok(observers.every(observer => observer.disconnected));
  }
  assert.equal(setups, 2); assert.equal(cleanups, 2);
});

function sceneHarness(name, hook, locale, mobile = false) {
  let setup, top = 1000, focused = false;
  class ContinueTarget { closest() { return true; } }
  const variables = new Map();
  let styleWrites = 0, stateWrites = 0;
  const map = { style: { setProperty: (name, value) => { styleWrites++; variables.set(name, value); } } };
  const progressBar = { style: { getPropertyValue: name => variables.get(name) || "", setProperty: (name, value) => variables.set(name, value) } };
  const announcement = { textContent: "" };
  const buttons = [{ disabled: true }];
  const root = {
    ...events(), dataset: new Proxy({}, { set(target, key, value) { stateWrites++; target[key] = value; return true; } }), offsetHeight: 10000,
    style: { setProperty: (name, value) => variables.set(name, value) },
    getBoundingClientRect: () => ({ top }),
    querySelector: selector => selector === "[data-demo-progress]" ? progressBar : selector.includes("announcement") ? announcement : selector === "[data-booking-review]" ? { focus: () => { focused = true; } } : null,
    querySelectorAll: selector => selector === "[data-booking-continue]" ? buttons : selector === "[data-booking-map]" ? [map] : [],
    removeAttribute(name) { if (name === "data-stage") delete this.dataset.stage; },
  };
  let dictionary;
  const load = sourceLoader({
    react: { useCallback: fn => fn },
    "@/hooks/use-scroll-scene": { useScrollScene: (_, factory) => { setup = factory; } },
    "@/hooks/use-translations": { useTranslations: () => dictionary },
  }, { Element: ContinueTarget, window: { innerHeight: 1000, matchMedia: query => ({ matches: query.includes("max-width") && mobile }) } });
  dictionary = load(`@/i18n/dictionaries/${locale}`)[locale];
  load(`@/hooks/use-${name}-scroll`)[hook]();
  const viewport = { offsetHeight: mobile ? 650 : 800 };
  const controller = setup({ root, viewport });
  return { writes: () => ({ styleWrites, stateWrites }), root, variables, announcement, dictionary, buttons, controller, setTop: value => { top = value; }, continueWithKeyboard: () => root.emit("click", { target: new ContinueTarget() }), isReviewFocused: () => focused };
}

const scenes = [
  ["ticketing", "useTicketingScroll", "ready", "validated"],
  ["backoffice", "useBackofficeScroll", "queue", "saved"],
  ["commerce", "useCommerceScroll", "discover", "complete"],
];
for (const [name, hook, initial, final] of scenes) {
  for (const locale of ["en", "es"]) {
    test(`${name}: all phases are localized in ${locale}, reversible, and settle with reduced motion`, () => {
      const h = sceneHarness(name, hook, locale);
      const messages = h.dictionary[name].announcements;
      const phases = new Set();
      h.controller.update(false);
      assert.equal(h.root.dataset.phase, initial);
      for (let top = 1000; top >= -10000; top -= 20) {
        h.setTop(top); h.controller.update(false);
        const phase = h.root.dataset.phase;
        phases.add(phase);
        assert.equal(h.announcement.textContent, messages[phase]);
        assert.ok(h.announcement.textContent.length > 0);
        for (const value of h.variables.values()) assert.ok(!/NaN|Infinity/.test(value));
      }
      assert.deepEqual([...phases].sort(), Object.keys(messages).sort());
      h.setTop(1000); h.controller.update(false);
      assert.equal(h.root.dataset.phase, initial);
      h.controller.update(true);
      assert.equal(h.root.dataset.phase, final);
      assert.equal(h.announcement.textContent, messages[final]);
    });
  }
}

test("seat selection avoids unchanged DOM writes and culls layers only after their fade", () => {
  const h = sceneHarness("seat-selection", "useSeatSelectionScroll", "en", true);
  h.controller.update(false);
  const initial = h.writes();
  h.controller.update(false);
  assert.deepEqual(h.writes(), initial);
  let crossfade = false;
  for (let top = 1000; top >= -10000; top -= 20) {
    h.setTop(top); h.controller.update(false);
    const overview = Number(h.variables.get("--booking-map-opacity"));
    const limited = Number(h.variables.get("--booking-first-grid"));
    const grid = Number(h.variables.get("--booking-grid"));
    assert.equal(h.root.dataset.mapVisible, String(overview > 0));
    assert.equal(h.root.dataset.limitedVisible, String(limited > 0));
    assert.equal(h.root.dataset.gridVisible, String(grid > 0));
    if (overview > 0 && overview < 1 && (limited > 0 || grid > 0)) crossfade = true;
  }
  assert.ok(crossfade, "keep outgoing and incoming layers throughout a crossfade");
  h.setTop(1000); h.controller.update(false);
  assert.equal(h.root.dataset.mapVisible, "true");
  assert.equal(h.root.dataset.gridVisible, "false");
});

for (const locale of ["en", "es"]) {
  test(`seat selection: every step has an announcement in ${locale}, including reverse scroll`, () => {
    const h = sceneHarness("seat-selection", "useSeatSelectionScroll", locale, true);
    for (let top = 1000; top >= -10000; top -= 20) {
      h.setTop(top); h.controller.update(false);
      assert.equal(typeof h.announcement.textContent, "string");
      assert.ok(h.announcement.textContent.length > 0, h.root.dataset.action);
    }
    assert.equal(h.root.dataset.review, "true");
    h.setTop(1000); h.controller.update(false);
    assert.equal(h.buttons[0].disabled, true);
    h.controller.update(true);
    assert.equal(h.buttons[0].disabled, false);
    h.controller.cleanup();
    assert.equal(h.root.handlers.size, 0);
  });

  test(`editor and craft retain final and reversed states in ${locale}`, () => {
    const editor = sceneHarness("stadium-editor", "useStadiumEditorScroll", locale);
    editor.controller.update(true);
    assert.equal(editor.root.dataset.action, "saved");
    assert.equal(editor.announcement.textContent, editor.dictionary.stadiumEditor.announcements.saved);
    editor.setTop(1000); editor.controller.update(false);
    assert.equal(editor.root.dataset.action, "create");
    const craft = sceneHarness("craft", "useCraftScroll", locale);
    craft.controller.update(true);
    assert.equal(craft.variables.get("--craft-progress"), "1");
    assert.equal(craft.root.dataset.motion, "false");
    assert.equal(craft.root.dataset.stage, undefined);
    craft.setTop(1000); craft.controller.update(false);
    assert.equal(craft.variables.get("--craft-progress"), "0");
  });
}

test("switching language at a fixed scroll position refreshes announcements without moving the scene", () => {
  for (const [name, hook] of scenes) {
    const english = sceneHarness(name, hook, "en");
    const spanish = sceneHarness(name, hook, "es");
    english.setTop(-4000); spanish.setTop(-4000);
    english.controller.update(false); spanish.controller.update(false);
    assert.equal(english.root.dataset.phase, spanish.root.dataset.phase);
    assert.deepEqual([...english.variables], [...spanish.variables]);
    assert.notEqual(english.announcement.textContent, spanish.announcement.textContent);
  }
});

test("metadata exposes canonical, language alternates and social images for both static locales", () => {
  const { pageMetadata } = sourceLoader()("@/lib/site");
  for (const [locale, canonical] of [["en", "/"], ["es", "/es"]]) {
    const metadata = pageMetadata(locale);
    assert.equal(metadata.metadataBase.href, "https://nicocieri.dev/");
    assert.equal(metadata.alternates.canonical, canonical);
    assert.equal(metadata.alternates.languages.es, "/es");
    assert.equal(metadata.openGraph.url, canonical);
    assert.equal(metadata.openGraph.images[0].width, 1200);
    assert.equal(metadata.twitter.card, "summary_large_image");
  }
});

function contrast(first, second) {
  const luminance = hex => {
    const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
      .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return channels.reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  };
  const [low, high] = [luminance(first), luminance(second)].sort((a, b) => a - b);
  return (high + 0.05) / (low + 0.05);
}

test("text and primary button tokens meet AA contrast in both themes and interaction states", () => {
  const css = fs.readFileSync(path.join(project, "src/styles/tokens.css"), "utf8");
  const [light, dark] = css.split(':root[data-theme="dark"]');
  const resolve = (name, theme) => {
    const value = theme.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]
      ?? light.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1];
    assert.ok(value, name);
    return value.startsWith("var(") ? resolve(value.slice(6, -1), theme) : value;
  };
  for (const theme of [light, dark]) {
    for (const background of ["surface", "background", "background-alt"]) {
      assert.ok(contrast(resolve("accent", theme), resolve(background, theme)) >= 4.5, background);
    }
    for (const background of ["accent-lime", "accent-lime-hover", "accent-lime-pressed"]) {
      assert.ok(contrast(resolve("on-accent-lime", theme), resolve(background, theme)) >= 4.5, background);
    }
  }
});

test("seat confirmation keeps keyboard focus when the Continue control disappears", () => {
  const h = sceneHarness("seat-selection", "useSeatSelectionScroll", "es", true);
  h.setTop(-8166);
  h.controller.update(false);
  assert.equal(h.root.dataset.ready, "true");
  assert.equal(h.root.dataset.review, "false");
  h.continueWithKeyboard();
  assert.equal(h.root.dataset.review, "true");
  assert.equal(h.isReviewFocused(), true);
});

test("section navigation includes Home, returns to the hero and preserves the work alias", () => {
  let effect, navigation;
  const frames = new Map();
  const browser = { ...events(), innerHeight: 1000, scrollY: 0, location: { pathname: "/es", search: "", hash: "" } };
  browser.requestAnimationFrame = callback => { frames.set(1, callback); return 1; };
  browser.cancelAnimationFrame = id => frames.delete(id);
  browser.history = { state: null, replaceState: (_, __, url) => { browser.location.hash = url.includes("#") ? url.slice(url.indexOf("#")) : ""; } };
  const load = sourceLoader({ react: {
    useState: initial => { navigation ??= initial; return [navigation, update => { navigation = typeof update === "function" ? update(navigation) : update; }]; },
    useEffect: callback => { effect = callback; },
  } }, {
    window: browser,
    document: { body: {}, documentElement: { scrollHeight: 60000 }, getElementById: id => elements[id] },
    ResizeObserver: class { observe() {} disconnect() {} },
  });
  const sections = load("@/content/section-navigation").portfolioSections;
  const elements = Object.fromEntries(sections.map(({ id }, index) => [id, { getBoundingClientRect: () => ({ top: (index === 0 ? 80 : 1000 + (index - 1) * 6000) - browser.scrollY }) }]));
  elements.top = { getBoundingClientRect: () => ({ top: -browser.scrollY }) };
  const hook = load("@/hooks/use-section-navigation").useSectionNavigation();
  const cleanup = effect();
  const flush = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); };
  assert.equal(sections[0].id, "about");
  assert.equal(navigation.activeId, "about");
  assert.equal(navigation.visible, true);
  assert.equal(browser.location.hash, "");
  browser.scrollY = 1000; browser.emit("scroll"); flush();
  assert.equal(navigation.activeId, "ticketing");
  hook.selectSection("about");
  assert.equal(navigation.pendingId, "about");
  browser.location.hash = "#top"; browser.emit("popstate");
  browser.scrollY = 500; flush();
  assert.equal(browser.location.hash, "#top");
  browser.scrollY = 0; browser.emit("scroll"); flush();
  assert.equal(navigation.activeId, "about");
  assert.equal(navigation.pendingId, null);
  assert.equal(browser.location.hash, "");
  browser.location.hash = "#work"; browser.emit("popstate");
  browser.scrollY = 1000; flush();
  assert.equal(browser.location.hash, "#ticketing");
  cleanup();
  assert.equal(browser.handlers.size, 0);
});

test("footer language navigation restores its position before revealing the new document", () => {
  const scripts = sourceLoader()("@/lib/footer-navigation");
  for (const hash of ["#site-footer", "#contact", ""]) {
    const state = { scrollBehavior: "", visibility: "", loads: 0, scrolls: 0, frames: [] };
    const style = {
      get scrollBehavior() { return state.scrollBehavior; },
      set scrollBehavior(value) { state.scrollBehavior = value; },
      set visibility(value) { state.visibility = value; },
      removeProperty(name) { if (name === "visibility") state.visibility = ""; else state.scrollBehavior = ""; },
    };
    let onLoad;
    const context = vm.createContext({
      location: { hash },
      document: {
        documentElement: { style },
        getElementById: () => ({ scrollIntoView: options => {
          assert.equal(options.behavior, "instant");
          assert.equal(options.block, "end");
          assert.equal(state.scrollBehavior, "auto");
          state.scrolls++;
        } }),
      },
      window: { addEventListener: (name, callback, options) => {
        assert.equal(name, "load"); assert.equal(options.once, true);
        onLoad = callback; state.loads++;
      } },
      requestAnimationFrame: callback => state.frames.push(callback),
    });
    vm.runInContext(scripts.footerNavigationStart, context);
    if (hash === "#site-footer") {
      assert.equal(state.visibility, "hidden");
      assert.equal(state.scrollBehavior, "auto");
    }
    vm.runInContext(scripts.footerNavigationRestore, context);
    assert.equal(state.visibility, "");
    if (hash === "#site-footer") {
      assert.equal(state.scrolls, 1);
      onLoad(); state.frames[0]();
      assert.equal(state.scrolls, 2);
      assert.equal(state.scrollBehavior, "");
    } else {
      assert.equal(state.scrolls, 0);
      assert.equal(state.loads, 0);
    }
  }
});

test("airport sizing flattens the desktop player wrapper and fits the remaining height", () => {
  let effect, resize;
  const values = new Map();
  const frames = new Map();
  const browser = { ...events(), matchMedia: () => ({ matches: false }) };
  const art = { offsetWidth: 820, offsetHeight: 500 };
  const viewport = { clientHeight: 680, children: [] };
  const stage = {
    clientWidth: 1000,
    get offsetHeight() { return parseFloat(this.style.height) || 440; },
    style: { setProperty: (key, value) => values.set(key, value), height: "" },
    closest: () => viewport, querySelector: () => art,
  };
  const player = { offsetHeight: 0, children: [stage] };
  viewport.children = [{ offsetHeight: 150 }, player, { offsetHeight: 64 }, { offsetHeight: 2 }, { offsetHeight: 15 }];
  let position = "sticky";
  const load = sourceLoader({ react: { useRef: () => ({ current: stage }), useEffect: callback => { effect = callback; } } }, {
    window: browser,
    getComputedStyle: element => element === viewport
      ? { position, paddingTop: "16px", paddingBottom: "16px", rowGap: "16px" }
      : { position: "static", display: element === player ? "contents" : "block" },
    requestAnimationFrame: callback => { frames.set(1, callback); return 1; },
    cancelAnimationFrame: id => frames.delete(id),
    ResizeObserver: class { constructor(callback) { resize = callback; } observe() {} disconnect() {} },
  });
  load("@/hooks/use-airport-layout").useAirportLayout();
  const cleanup = effect();
  assert.equal(stage.offsetHeight, 349);
  assert.equal(values.get("--airport-scale"), "0.698");
  const flush = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); };
  // Repeated measurements must not inflate the stage through the zero-height wrapper.
  resize(); flush(); assert.equal(stage.offsetHeight, 349);
  viewport.clientHeight = 620;
  browser.emit("resize"); flush(); assert.equal(stage.offsetHeight, 289);
  position = "static";
  resize(); flush(); assert.equal(stage.offsetHeight, 500);
  cleanup();
  assert.equal(browser.handlers.size, 0);
});

test("mobile illustrations resize around text and controls, then release desktop overrides", () => {
  let effect, onResize, stopped = false, nextFrame = 0;
  const values = new Map();
  const frames = new Map();
  const mobile = { ...events(), matches: true };
  const browser = { ...events(), matchMedia: () => mobile };
  const header = { offsetHeight: 174 };
  const art = { offsetHeight: 372 };
  const viewport = { clientHeight: 735, children: [] };
  let fillSpace = false;
  const stage = {
    hasAttribute: () => fillSpace,
    clientWidth: 353,
    get offsetHeight() { return parseFloat(values.get("--demo-stage-height")) || 240; },
    style: {
      getPropertyValue: name => values.get(name) || "",
      setProperty: (name, value) => values.set(name, value),
      removeProperty: name => values.delete(name),
    },
    querySelector: () => art,
    closest: () => viewport,
  };
  viewport.children = [header, { get offsetHeight() { return stage.offsetHeight + 32; } }, { offsetHeight: 48 }, { offsetHeight: 69 }];
  let position = "sticky";
  const load = sourceLoader({ react: { useRef: () => ({ current: stage }), useLayoutEffect: fn => { effect = fn; } } }, {
    window: browser,
    getComputedStyle: element => element === viewport
      ? { position, paddingTop: "12px", paddingBottom: "80px", rowGap: "12px" }
      : { position: "static", display: "block" },
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
    ResizeObserver: class {
      constructor(callback) { onResize = callback; }
      observe() {}
      disconnect() { stopped = true; }
    },
  });
  load("@/hooks/use-mobile-demo-layout").useMobileDemoLayout();
  const cleanup = effect();
  const flush = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); };
  const assertFits = () => {
    const total = viewport.children.reduce((sum, child) => sum + child.offsetHeight, 0) + 92 + 36;
    assert.ok(total <= viewport.clientHeight);
  };
  assertFits();
  const initial = parseFloat(values.get("--demo-scale"));
  header.offsetHeight = 240;
  onResize(); onResize(); assert.equal(frames.size, 1); flush();
  assert.ok(parseFloat(values.get("--demo-scale")) < initial);
  assertFits();
  viewport.clientHeight = 667; browser.emit("resize"); flush(); assertFits();
  fillSpace = true;
  header.offsetHeight = 174;
  let previousScale = 0, previousHeight = 0;
  // Same width/content: retracting browser controls must never shrink the demo.
  for (const height of [667, 735, 852, 900]) {
    viewport.clientHeight = height;
    onResize(); flush(); assertFits();
    const scale = parseFloat(values.get("--demo-scale"));
    const stageHeight = parseFloat(values.get("--demo-stage-height"));
    assert.ok(scale >= previousScale);
    assert.ok(stageHeight > previousHeight);
    previousScale = scale; previousHeight = stageHeight;
  }
  assert.ok(parseFloat(values.get("--demo-scale")) > 0.85);
  assert.ok(parseFloat(values.get("--demo-stage-height")) > art.offsetHeight * parseFloat(values.get("--demo-scale")));
  fillSpace = false;
  position = "static"; onResize(); flush();
  assert.equal(values.get("--demo-scale"), "0.8500");
  mobile.matches = false; mobile.emit("change"); flush();
  assert.equal(values.size, 0);
  onResize(); cleanup();
  assert.equal(frames.size, 0);
  assert.equal(browser.handlers.size, 0);
  assert.equal(mobile.handlers.size, 0);
  assert.equal(stopped, true);
});

for (const locale of ["en", "es"]) {
  test(`airport: check-in preserves phase order, reverses and settles without motion (${locale})`, () => {
    const h = sceneHarness("airport", "useAirportScroll", locale);
    const seen = new Set();
    for (let top = 1000; top >= -10000; top -= 20) {
      h.setTop(top); h.controller.update(false);
      seen.add(h.root.dataset.phase);
      assert.equal(h.announcement.textContent, h.root.dataset.phase === "0" ? h.dictionary.airport.searchAnnouncements[h.root.dataset.searchState] : h.dictionary.airport.phases[Number(h.root.dataset.phase)]);
      for (const value of h.variables.values()) assert.ok(!/NaN|Infinity/.test(value));
    }
    assert.deepEqual([...seen], ["0", "1", "2", "3"]);
    h.setTop(1000); h.controller.update(false);
    assert.equal(h.root.dataset.phase, "0");
    assert.equal(h.variables.get("--airport-seat"), "0");
    assert.equal(h.variables.get("--airport-bag"), "0");
    h.controller.update(true);
    assert.equal(h.root.dataset.phase, "3");
    assert.equal(h.variables.get("--airport-ticket"), "1");
    assert.equal(h.announcement.textContent, h.dictionary.airport.phases[3]);
  });
}

test("airport search types a PNR before loading, reveals results and reverses cleanly", () => {
  const h = sceneHarness("airport", "useAirportScroll", "es");
  const states = [];
  for (let top = 1000; top > -3000; top -= 20) {
    h.setTop(top); h.controller.update(false);
    if (states.at(-1) !== h.root.dataset.searchState) states.push(h.root.dataset.searchState);
    assert.equal(h.root.dataset.reservationReady, String(h.root.dataset.searchState === "ready"));
  }
  assert.deepEqual(states, ["idle", "typing", "loading", "ready"]);
  h.setTop(1000); h.controller.update(false);
  assert.equal(h.root.dataset.searchState, "idle");
  assert.equal(h.root.dataset.reservationReady, "false");
  h.controller.update(true);
  assert.equal(h.root.dataset.searchState, "ready");
  assert.equal(h.variables.get("--airport-pointer-opacity"), "0");
});


test("mobile autoplay loops only while visible, pauses hidden and respects reduced motion", () => {
  let effect, observerCallback, frameId = 0;
  const frames = new Map(), samples = [];
  const root = { id: "ticketing", dataset: {}, dispatchEvent: event => samples.push(event.detail) };
  const mobile = { ...events(), matches: true }, motion = { ...events(), matches: false };
  const page = { ...events(), hidden: false };
  const load = sourceLoader({ react: {
    useRef: () => ({ current: { closest: () => root } }),
    useEffect: fn => { effect = fn; },
  } }, {
    window: { matchMedia: query => query.includes("reduced-motion") ? motion : mobile }, document: page,
    CustomEvent: class { constructor(type, { detail }) { this.type = type; this.detail = detail; } },
    requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class { constructor(fn) { observerCallback = fn; } observe() {} disconnect() {} },
  });
  load("@/hooks/use-demo-playback").useDemoPlayback();
  const cleanup = effect();
  const tick = time => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(time)); };
  assert.equal(frames.size, 0);
  observerCallback([{ isIntersecting: true, intersectionRatio: 0.1 }]); assert.equal(frames.size, 0);
  observerCallback([{ isIntersecting: true, intersectionRatio: 0.8 }]);
  tick(0); tick(100); const beforePause = samples.at(-1);
  observerCallback([{ isIntersecting: false, intersectionRatio: 0 }]); assert.equal(frames.size, 0);
  observerCallback([{ isIntersecting: true, intersectionRatio: 0.8 }]);
  tick(5000); assert.equal(samples.at(-1), beforePause);
  page.hidden = true; page.emit("visibilitychange"); assert.equal(frames.size, 0);
  page.hidden = false; page.emit("visibilitychange");
  for (let time = 6000; time < 20000; time += 100) tick(time);
  assert.ok(samples.includes(1));
  const completed = samples.indexOf(1);
  assert.ok(samples.slice(completed + 1).includes(0), "restart after the completed state");
  motion.matches = true; motion.emit("change"); assert.equal(frames.size, 0);
  motion.matches = false; motion.emit("change"); assert.equal(frames.size, 1);
  mobile.matches = false; mobile.emit("change"); assert.equal(frames.size, 0);
  cleanup(); assert.equal(frames.size, 0); assert.equal(page.handlers.size, 0);
});

test("desktop demos visibly progress before the section reaches the top", () => {
  const tracks = [
    ["ticketing", "useTicketingScroll", "--scene-scroll"],
    ["seat-selection", "useSeatSelectionScroll", "--demo-progress"],
    ["stadium-editor", "useStadiumEditorScroll", "--demo-progress"],
    ["backoffice", "useBackofficeScroll", "--bo-progress"],
    ["commerce", "useCommerceScroll", "--commerce-progress"],
    ["airport", "useAirportScroll", "--airport-progress"],
    ["craft", "useCraftScroll", "--craft-progress"],
  ];
  for (const [name, hook, variable] of tracks) {
    const h = sceneHarness(name, hook, "en");
    h.setTop(1000); h.controller.update(false);
    assert.equal(Number(h.variables.get(variable)), 0, name);
    h.setTop(200); h.controller.update(false);
    const entering = Number(h.variables.get(variable));
    assert.ok(entering > 0 && entering < 1, name);
    if (name === "backoffice" || name === "commerce") assert.equal(h.variables.get("--scene-content-reveal"), "1");
    h.setTop(0); h.controller.update(false);
    assert.ok(Number(h.variables.get(variable)) > entering, name);
    h.setTop(1000); h.controller.update(false);
    assert.equal(Number(h.variables.get(variable)), 0, name);
  }
});

test("explicit playback progress drives every demo independently of scroll", () => {
  for (const [name, hook] of [...scenes, ["seat-selection", "useSeatSelectionScroll"], ["stadium-editor", "useStadiumEditorScroll"], ["airport", "useAirportScroll"], ["craft", "useCraftScroll"]]) {
    const h = sceneHarness(name, hook, "en", true);
    h.setTop(1000); h.controller.update(false, 0.45);
    if (name === "seat-selection" || name === "stadium-editor") assert.equal(h.variables.get("--demo-progress"), "0.4500");
    const before = [...h.variables];
    h.setTop(-7000); h.controller.update(false, 0.45);
    assert.deepEqual([...h.variables], before, name);
    h.controller.update(false, 1);
    if (name === "seat-selection" || name === "stadium-editor") assert.equal(h.variables.get("--demo-progress"), "1.0000");
    for (const value of h.variables.values()) assert.ok(!/NaN|Infinity/.test(value), name);
  }
});


test("seat section steps follow map, detail and decisions through replay and reverse", () => {
  for (const mobile of [false, true]) {
    const h = sceneHarness("seat-selection", "useSeatSelectionScroll", "en", mobile);
    const checkpoints = [[0, "1"], [0.2, "1"], [0.27, "2"], [0.35, "2"], [0.44, "2"], [0.49, "2"], [0.5, "3"], [0.65, "3"], [0.70, "3"], [0.8, "3"], [0.97, "3"], [1, "3"]];
    for (const [progress, expected] of [...checkpoints, ...checkpoints.toReversed(), [0, "1"]]) {
      h.controller.update(false, progress);
      assert.equal(h.root.dataset.step, expected, `mobile=${mobile}, progress=${progress}`);
      assert.equal(h.root.dataset.section, "N-03");
      assert.equal(h.root.dataset.limitedVisible, "false");
      assert.ok(!["firstSection", "limited", "back"].includes(h.root.dataset.action));
    }
    h.controller.update(true);
    assert.equal(h.root.dataset.step, "3");
  }
});
