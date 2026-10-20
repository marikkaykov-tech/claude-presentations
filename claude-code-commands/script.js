const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");

let current = 0;

function show(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((s, i) => s.classList.toggle("active", i === current));
  slides[current].scrollTop = 0;
  counter.textContent = `${current + 1} / ${slides.length}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
  history.replaceState(null, "", `#${current + 1}`);
}

prevBtn.addEventListener("click", () => show(current - 1));
nextBtn.addEventListener("click", () => show(current + 1));

document.addEventListener("keydown", (e) => {
  if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); show(current + 1); }
  if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); show(current - 1); }
  if (e.key === "Home") show(0);
  if (e.key === "End") show(slides.length - 1);
});

// Agenda items jump straight to their slide
document.querySelectorAll("[data-goto]").forEach((el) =>
  el.addEventListener("click", () => show(Number(el.dataset.goto) - 1))
);

// Simple swipe support for phones
let touchX = null;
document.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX));
document.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 60) show(current + (dx < 0 ? 1 : -1));
  touchX = null;
});

show((parseInt(location.hash.slice(1), 10) || 1) - 1);
