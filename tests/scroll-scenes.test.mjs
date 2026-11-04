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
  let effect, intersection, resize, nextFrame = 0, setups = 0, cleanups = 0;
  const frames = new Map();
  const calls = [];
  const browser = events();
  const motion = { ...events(), matches: false };
  const compact = { ...events(), matches: false };
  browser.matchMedia = query => query.includes("reduced-motion") ? motion : compact;
  const viewport = {};
  const liveRegion = { live: "polite", setAttribute(_, value) { this.live = value; } };
  const root = { querySelector: () => viewport, querySelectorAll: () => [liveRegion] };
  const observers = [];
  const load = sourceLoader({ react: {
    useRef: () => ({ current: root }),
    useEffect: fn => { effect = fn; },
  } }, {
    window: browser,
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class {
      constructor(callback) { intersection = callback; observers.push(this); }
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
    browser.emit("scroll"); browser.emit("scroll"); resize();
    assert.equal(frames.size, 1);
    const pending = [...frames.values()][0]; frames.clear(); pending();
    assert.equal(calls.at(-1), false);
    intersection([{ isIntersecting: false }]);
    assert.equal(liveRegion.live, "off");
    browser.emit("scroll"); resize();
    assert.equal(frames.size, 0);
    intersection([{ isIntersecting: true }]);
    assert.equal(liveRegion.live, "polite");
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
  const announcement = { textContent: "" };
  const buttons = [{ disabled: true }];
  const root = {
    ...events(), dataset: {}, offsetHeight: 10000,
    style: { setProperty: (name, value) => variables.set(name, value) },
    getBoundingClientRect: () => ({ top }),
    querySelector: selector => selector.includes("announcement") ? announcement : selector === "[data-booking-review]" ? { focus: () => { focused = true; } } : null,
    querySelectorAll: selector => selector === "[data-booking-continue]" ? buttons : [],
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
  return { root, variables, announcement, dictionary, buttons, controller, setTop: value => { top = value; }, continueWithKeyboard: () => root.emit("click", { target: new ContinueTarget() }), isReviewFocused: () => focused };
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
