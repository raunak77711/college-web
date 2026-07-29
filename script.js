/* =========================================
   PERSONAL PORTFOLIO - JAVASCRIPT
   Small functions, one for each feature.
   ========================================= */


/* ---- 1. MOBILE MENU ----
   Opens and closes the menu on small screens.
   The "show" class is styled at the bottom of style.css. */
function toggleMenu() {
  var links = document.getElementById("navLinks");
  links.classList.toggle("show");
}


/* ---- 2. DARK / LIGHT THEME ----
   Puts data-theme="dark" on the <html> tag and remembers
   the choice in localStorage so it stays after a refresh. */
function toggleTheme() {
  var root = document.documentElement;
  var isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }

  updateThemeIcon();
}

/* Shows a moon in light mode and a sun in dark mode */
function updateThemeIcon() {
  var btn = document.getElementById("themeBtn");
  if (!btn) return;

  var isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.innerHTML = isDark ? "&#9728;" : "&#9790;";
}


/* ---- 3. LEARN MORE BUTTON (Home page) ----
   Shows an alert, then sends the visitor to the About page. */
function learnMore() {
  alert("Thanks for your interest! Let's go to my About page.");
  window.location.href = "about.html";
}


/* ---- 4. CONTACT FORM (Contact page) ----
   There is no backend, so we just show a thank you message. */
function sendMessage(event) {
  event.preventDefault(); // stops the page from reloading

  // Read what the visitor typed
  var name = document.getElementById("name").value;

  // Show a message on the page
  var box = document.getElementById("formMsg");
  box.textContent = "Thank you, " + name + "! Your message has been received.";
  box.classList.add("show");

  // Clear the form fields
  event.target.reset();
}


/* ---- 5. FADE IN ON SCROLL ----
   Watches every element with the "reveal" class and adds
   "visible" when it scrolls into view. */
function startReveal() {
  var items = document.querySelectorAll(".reveal");

  // Older browsers just show everything straight away
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        // Small delay so cards appear one after another
        setTimeout(function () {
          entry.target.classList.add("visible");
        }, i * 90);

        watcher.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) {
    watcher.observe(el);
  });
}


/* ---- 6. WELCOME GREETING ----
   Runs once the page has loaded and changes with the time of day. */
window.onload = function () {
  updateThemeIcon();
  startReveal();

  var hour = new Date().getHours();
  var greeting = "Good evening";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }

  // Only the Home page has an element with the class "subtitle"
  var subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    subtitle.textContent = greeting + "! I'm a student at Islington College.";
  }

  // Close the mobile menu after tapping a link
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.getElementById("navLinks").classList.remove("show");
    });
  });
};
