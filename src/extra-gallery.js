const gallery = document.querySelector(".extra-stage");

if (gallery) {
  const slides = [...gallery.querySelectorAll(".extra-slide")];
  const viewport = gallery.querySelector(".extra-gallery-viewport");
  const controls = gallery.querySelector(".extra-gallery-controls");
  const playback = gallery.querySelector("[data-gallery-playback]");
  const status = gallery.querySelector(".gallery-status");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let visible = false;
  let timer;
  let gesture;

  const dots = slides.map((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}: ${slide.dataset.title}`);
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Show ${slide.dataset.title}`);
    button.setAttribute("aria-controls", "extra-gallery-slides");
    button.addEventListener("click", () => show(index, true));
    gallery.querySelector(".gallery-dots").append(button);
    return button;
  });

  function updatePlayback() {
    window.clearTimeout(timer);
    playback.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    playback.firstElementChild.textContent = paused ? "▷" : "Ⅱ";
    if (!paused && !hovered && visible && !document.hidden && slides.length > 1) {
      timer = window.setTimeout(() => show(current + 1), 6500);
    }
  }

  function show(index, manual = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === current)));
    if (manual) {
      paused = true;
      status.textContent = slides[current].getAttribute("aria-label");
    }
    updatePlayback();
  }

  gallery.querySelector("[data-gallery-prev]").addEventListener("click", () => show(current - 1, true));
  gallery.querySelector("[data-gallery-next]").addEventListener("click", () => show(current + 1, true));
  playback.addEventListener("click", () => { paused = !paused; updatePlayback(); });
  gallery.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    show(current + (event.key === "ArrowRight" ? 1 : -1), true);
  });
  gallery.addEventListener("mouseenter", () => { hovered = true; updatePlayback(); });
  gallery.addEventListener("mouseleave", () => { hovered = false; updatePlayback(); });
  gallery.addEventListener("focusin", (event) => {
    if (event.target === playback) return;
    paused = true;
    updatePlayback();
  });
  document.addEventListener("visibilitychange", updatePlayback);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) paused = true;
    updatePlayback();
  });

  viewport.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener("pointerup", (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      show(current + (dx < 0 ? 1 : -1), true);
    }
  });
  viewport.addEventListener("pointercancel", () => { gesture = null; });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
    updatePlayback();
  }, { threshold: 0.25 });
  observer.observe(gallery);
  controls.hidden = slides.length < 2;
  show(0);
}
