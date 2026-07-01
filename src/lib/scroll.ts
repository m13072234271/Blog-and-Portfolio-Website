const SCROLL_KEY = "content-scroll-pos";

export function saveScrollPos() {
  const main = document.querySelector("main");
  if (main) {
    sessionStorage.setItem(SCROLL_KEY, String(main.scrollTop));
  }
}

export function restoreScrollPos() {
  const saved = sessionStorage.getItem(SCROLL_KEY);
  if (saved) {
    sessionStorage.removeItem(SCROLL_KEY);
    requestAnimationFrame(() => {
      const main = document.querySelector("main");
      if (main) main.scrollTop = Number(saved);
    });
  }
}
