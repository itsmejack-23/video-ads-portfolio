// --------------------
// PROJECT SLIDER
// --------------------
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if(i === index) slide.classList.add("active");
  });
}

prev.addEventListener("click", () => {
  current--;
  if(current < 0) current = slides.length - 1;
  showSlide(current);
});

next.addEventListener("click", () => {
  current++;
  if(current >= slides.length) current = 0;
  showSlide(current);
});

// Initial display
showSlide(current);

// --------------------
// FAQ TOGGLE
// --------------------
const faqItems = document.querySelectorAll(".faq-item h3");

faqItems.forEach(item => {
  item.addEventListener("click", () => {
    const p = item.nextElementSibling;
    p.style.display = (p.style.display === "block") ? "none" : "block";
  });
});
