import "./styles.css";
import "./extra-gallery.js";
import { inject } from "@vercel/analytics";

inject();

const typedWord = document.querySelector("#hero-typed-word");
const typeWords = [
  "making.",
  "coding.",
  "building.",
  "connecting.",
  "learning.",
];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (typedWord) {
  let wordIndex = 0;
  let characterCount = typeWords[0].length;
  let deleting = true;
  let timer;

  const schedule = (delay) => {
    timer = window.setTimeout(step, delay);
  };

  function step() {
    if (deleting) {
      characterCount -= 1;
      typedWord.textContent = typeWords[wordIndex].slice(0, characterCount);
      if (characterCount === 0) {
        wordIndex = (wordIndex + 1) % typeWords.length;
        deleting = false;
        schedule(250);
      } else {
        schedule(65);
      }
      return;
    }

    characterCount += 1;
    typedWord.textContent = typeWords[wordIndex].slice(0, characterCount);
    if (characterCount === typeWords[wordIndex].length) {
      deleting = true;
      schedule(1900);
    } else {
      schedule(95);
    }
  }

  const resetMotion = () => {
    window.clearTimeout(timer);
    wordIndex = 0;
    characterCount = typeWords[0].length;
    deleting = true;
    typedWord.textContent = typeWords[0];
    if (!reducedMotion.matches) schedule(2100);
  };

  reducedMotion.addEventListener("change", resetMotion);
  resetMotion();
}

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const header = document.querySelector(".site-header");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
  nav?.classList.remove("is-open");
}

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute(
    "aria-label",
    expanded ? "Open navigation" : "Close navigation",
  );
  nav?.classList.toggle("is-open", !expanded);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("is-open")) {
    closeMenu();
    menuButton?.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!header?.contains(event.target)) closeMenu();
});
window.matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);
header?.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || event.pointerType !== "mouse") return;
  const bounds = header.getBoundingClientRect();
  header.style.setProperty("--glass-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
});

const progress = document.querySelector(".scroll-progress");
let ticking = false;
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
  let currentSection = "";
  for (const section of document.querySelectorAll("main section[id]")) {
    if (section.getBoundingClientRect().top <= 180) currentSection = `#${section.id}`;
  }
  nav?.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") === currentSection) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  ticking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  },
  { passive: true },
);
updateProgress();

document.querySelector("#year").textContent = new Date().getFullYear();
