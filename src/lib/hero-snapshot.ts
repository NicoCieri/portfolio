/** A visual-only copy of the real header and hero, positioned at its viewport coordinates. */
export function createHeroSnapshot(hero: HTMLElement, theme: "light" | "dark") {
  const snapshot = document.createElement("div");
  snapshot.setAttribute("aria-hidden", "true");
  snapshot.inert = true;
  snapshot.dataset.theme = theme;
  snapshot.className = "pointer-events-none fixed inset-0 font-sans text-foreground [&_*]:animate-none! [&_*]:transition-none!";

  // Resolve the target palette synchronously, restoring the live theme before paint.
  // Include inherited layout/font tokens so the portal matches the original hero.
  const root = document.documentElement;
  const previousTheme = root.getAttribute("data-theme");
  try {
    root.dataset.theme = theme;
    const styles = getComputedStyle(hero);
    for (const property of styles) {
      if (property.startsWith("--")) snapshot.style.setProperty(property, styles.getPropertyValue(property));
    }
  } finally {
    if (previousTheme === null) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", previousTheme);
  }

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  for (const source of [header, hero]) {
    if (!source) continue;
    const bounds = source.getBoundingClientRect();
    const content = source.cloneNode(true) as HTMLElement;
    for (const element of [content, ...content.querySelectorAll<HTMLElement>("*")]) {
      element.removeAttribute("id");
      element.removeAttribute("aria-labelledby");
      element.removeAttribute("aria-describedby");
    }
    content.style.position = "absolute";
    content.style.left = `${bounds.left}px`;
    content.style.top = `${bounds.top}px`;
    content.style.width = `${bounds.width}px`;
    content.style.margin = "0";
    snapshot.appendChild(content);
  }
  return snapshot;
}
