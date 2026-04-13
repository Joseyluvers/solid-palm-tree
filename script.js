const toggle = document.getElementById("toggle");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll("#menu a");

// Toggle menu on hamburger click
toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Close menu when a link is clicked (mobile friendly)
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = "smooth";

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest("header")) {
    menu.classList.remove("active");
  }
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});

// Stagger card animations
const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.animation = `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`;
});

// Stagger timeline box animations
const timelineBoxes = document.querySelectorAll(".timeline .box");
timelineBoxes.forEach((box, index) => {
  box.style.opacity = "0";
  box.style.animation = `slideInLeft 0.6s ease-out ${0.1 * (index + 1)}s forwards`;
});

// Stagger skill category animations
const skillCategories = document.querySelectorAll(".skill-category");
skillCategories.forEach((category, index) => {
  category.style.opacity = "0";
  category.style.animation = `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`;
});

// Add active state indicator to nav links on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.style.opacity = "0.6";
    if (link.getAttribute("href").slice(1) === current) {
      link.style.opacity = "1";
      link.style.textDecoration = "underline";
    } else {
      link.style.textDecoration = "none";
    }
  });
});

// Parallax effect on hero section
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
  }
});

// Add smooth transitions for hover effects
const interactiveElements = document.querySelectorAll(".card, .skill-tag, .project-link, .timeline .box");
interactiveElements.forEach(element => {
  element.style.transition = "all 0.4s cubic-bezier(0.23, 1, 0.320, 1)";
});
