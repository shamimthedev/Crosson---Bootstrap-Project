// js/script.js
// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Loading Screen
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.classList.add("fade-out");
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Header Scroll Effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    backToTop.style.display = "block";
  } else {
    header.classList.remove("scrolled");
    backToTop.style.display = "none";
  }
});

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll("[data-counter]");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-counter"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    // Check if counter is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// FAQ Toggle
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector("i");

  if (answer.classList.contains("active")) {
    answer.classList.remove("active");
    icon.style.transform = "rotate(0deg)";
  } else {
    // Close all other FAQs
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      ans.classList.remove("active");
    });
    document.querySelectorAll(".faq-question i").forEach((ic) => {
      ic.style.transform = "rotate(0deg)";
    });

    // Open current FAQ
    answer.classList.add("active");
    icon.style.transform = "rotate(180deg)";
  }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Contact Form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Simple form validation and submission simulation
  const formData = new FormData(this);

  // Show success message (in real implementation, send to server)
  alert("Thank you for your message! We will contact you soon.");
  this.reset();
});

// Initialize counter animation
animateCounters();

// Mobile menu close on link click
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});
