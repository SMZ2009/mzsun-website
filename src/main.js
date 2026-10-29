import "./styles.css";
import "./extra-gallery.js";
import now from "./now-data.json";
import { inject } from "@vercel/analytics";

inject();

const currentLocation = document.querySelector("#now-location");
const nextEvent = document.querySelector("#now-next-event");
if (currentLocation && nextEvent) {
  currentLocation.textContent = `${now.location.city}, ${now.location.country}`;
  const today = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const upcoming = now.events
    .filter((event) => (event.endDate || event.startDate) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];

  if (upcoming) {
    const formatDay = (value) => new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T12:00:00Z`));
    const dateText = upcoming.endDate && upcoming.endDate !== upcoming.startDate
      ? `${formatDay(upcoming.startDate)} – ${formatDay(upcoming.endDate)}`
      : formatDay(upcoming.startDate);
    const date = document.createElement("span");
    date.className = "contact-now-date";
    date.textContent = `${dateText}, ${upcoming.startDate.slice(0, 4)}`;
    const title = document.createElement("strong");
    title.textContent = upcoming.title;
    const place = document.createElement("span");
    place.className = "contact-now-place";
    place.textContent = upcoming.place;
    nextEvent.append(title, date, place);
  } else {
    nextEvent.textContent = "No upcoming plans to share yet.";
  }
}

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
