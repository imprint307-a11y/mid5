/* =========================================================
   Personal Medical Graduate Website
   File: script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");

  const revealElements = document.querySelectorAll(".reveal");

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  /* =========================
     1. Header Scroll Effect
     ========================= */
  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  /* =========================
     2. Mobile Navigation Menu
     ========================= */
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (isOpen) {
        navToggle.setAttribute("aria-label", "Close menu");
      } else {
        navToggle.setAttribute("aria-label", "Open menu");
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* =========================
     3. Active Navigation Link
     ========================= */
  const sections = document.querySelectorAll("main section[id]");

  function setActiveNavLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink);
  setActiveNavLink();

  /* =========================
     4. Dark / Light Theme
     ========================= */
  function setThemeIcon() {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;

    if (body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  const savedTheme = localStorage.getItem("doctorWebsiteTheme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  setThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        localStorage.setItem("doctorWebsiteTheme", "dark");
      } else {
        localStorage.setItem("doctorWebsiteTheme", "light");
      }

      setThemeIcon();
    });
  }

  /* =========================
     5. Reveal Animation on Scroll
     ========================= */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =========================
     6. Back to Top Button
     ========================= */
  function handleBackToTopVisibility() {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleBackToTopVisibility);
  handleBackToTopVisibility();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================
     7. Smooth Scroll for Internal Links
     ========================= */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =========================
     8. Contact Form Validation
     ========================= */
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.style.color = "#c0392b";
        return;
      }

      if (!isValidEmail(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.style.color = "#c0392b";
        return;
      }

      formStatus.textContent =
        "Thank you! Your message has been prepared successfully.";
      formStatus.style.color = "var(--primary-dark)";

      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = "";
      }, 5000);
    });
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /* =========================
     9. Small Hero Counter Animation
     ========================= */
  const statNumbers = document.querySelectorAll(".hero-stats strong");

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateStat(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.6,
    }
  );

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  function animateStat(element) {
    const originalText = element.textContent.trim();

    const numberMatch = originalText.match(/\d+/);

    if (!numberMatch) return;

    const targetNumber = Number(numberMatch[0]);
    const hasPlus = originalText.includes("+");
    let currentNumber = 0;

    const duration = 900;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = targetNumber / totalSteps;

    const counter = setInterval(() => {
      currentNumber += increment;

      if (currentNumber >= targetNumber) {
        element.textContent = hasPlus ? `${targetNumber}+` : `${targetNumber}`;
        clearInterval(counter);
      } else {
        element.textContent = hasPlus
          ? `${Math.floor(currentNumber)}+`
          : `${Math.floor(currentNumber)}`;
      }
    }, stepTime);
  }
});