// Mobile Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu after clicking
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Form Validation
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[name="name"]');
    const email = this.querySelector('input[name="email"]');
    const message = this.querySelector('textarea[name="message"]');
    let isValid = true;

    // Simple validation
    if (name.value.trim() === "") {
      alert("Please enter your name");
      isValid = false;
    }

    if (email.value.trim() === "" || !email.value.includes("@")) {
      alert("Please enter a valid email");
      isValid = false;
    }

    if (message.value.trim() === "") {
      alert("Please enter your message");
      isValid = false;
    }

    if (isValid) {
      // Here you would typically send the form data to a server
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    }
  });
}

// Animate Elements When Scrolling
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();

  // Set current year in footer
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Hero typing animation
  // Hero typing animation - Fixed version
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    // Save the original HTML (with span tag for colored name)
    const originalHTML = heroTitle.innerHTML;
    heroTitle.innerHTML = "";

    // Create a temporary element to work with the text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalHTML;
    const textNodes = [];

    // Extract all text nodes (including span contents)
    const extractTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node.textContent);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === "SPAN") {
          // Keep span elements intact
          textNodes.push(node.outerHTML);
        } else {
          Array.from(node.childNodes).forEach(extractTextNodes);
        }
      }
    };

    Array.from(tempDiv.childNodes).forEach(extractTextNodes);

    // Join all text parts
    const fullText = textNodes.join("");
    let i = 0;

    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        // Insert the characters one by one, preserving HTML tags
        heroTitle.innerHTML = fullText.substring(0, i + 1);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
  }
});

// Testimonial Slider
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none";
  });
}

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Initialize first testimonial
if (testimonials.length > 0) {
  showTestimonial(0);
}

// Back to Top Button
const backToTopBtn = document.createElement("div");
backToTopBtn.className = "back-to-top";
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Dark Mode Toggle
const darkModeToggle = document.createElement("div");
darkModeToggle.className = "dark-mode-toggle";
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Check for saved dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
