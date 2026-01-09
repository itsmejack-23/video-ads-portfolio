 // ======================
// PROJECT SLIDER
// ======================
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let current = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// Show slide by index
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

// Next / Prev Buttons
prev.addEventListener("click", () => {
  current--;
  if (current < 0) current = slides.length - 1;
  showSlide(current);
});

next.addEventListener("click", () => {
  current++;
  if (current >= slides.length) current = 0;
  showSlide(current);
});

// Drag / Swipe functionality
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mouseup", dragEnd);
slider.addEventListener("mouseleave", dragEnd);
slider.addEventListener("mousemove", dragAction);

slider.addEventListener("touchstart", dragStart);
slider.addEventListener("touchend", dragEnd);
slider.addEventListener("touchmove", dragAction);

function dragStart(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  slider.classList.add("grabbing");
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && current < slides.length - 1) current++;
  if (movedBy > 100 && current > 0) current--;

  setPositionByIndex();

  slider.classList.remove("grabbing");
}

function dragAction(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = current * -slider.offsetWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
  showSlide(current);
}

// Initial display
showSlide(current);

// ======================
// FAQ TOGGLE
// ======================
const faqItems = document.querySelectorAll(".faq-item h3");

faqItems.forEach(item => {
  item.addEventListener("click", () => {
    const p = item.nextElementSibling;
    p.style.display = (p.style.display === "block") ? "none" : "block";
  });
});
