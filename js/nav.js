export function initNav() {
  const toggle = document.querySelector('[aria-controls="nav-mobile"]');
  const menu = document.getElementById("nav-mobile");
  if (!toggle || !menu) return; // trang này không có menu mobile → thoát êm

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);
  }

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (e.target.closest("header")) return;
    setOpen(false);
  });

  const desktop = window.matchMedia("(min-width: 1024px)");
  desktop.addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
}

export function initHeaderOnScroll() {
  const header = document.querySelector("header");
  const sentinel = document.getElementById("nav-sentinel");
  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("scrolled", !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  observer.observe(sentinel);
}

export function initToTop() {
  const btn = document.getElementById("nut-len-dau");
  if (!btn) return;

  const SHOW_AFTER = 80;
  let ticking = false;

  function updateVisibility() {
    const shouldShow = window.scrollY > SHOW_AFTER;
    btn.classList.toggle("show", shouldShow);
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateVisibility();
}

export function initDarkMode() {
  const toggle = document.getElementById("dark-mode-toggle");
  if (!toggle) return;

  const root = document.documentElement;
  const STORAGE_KEY = "theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  const current = root.getAttribute("data-theme");
  if (!current) {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  } else {
    toggle.setAttribute("aria-pressed", String(current === "dark"));
  }

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}