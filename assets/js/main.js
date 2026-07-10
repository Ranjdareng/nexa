const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-animate]").forEach((element) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  observer.observe(element);
});

const counters = document.querySelectorAll("[data-count]");

const formatCounter = (value, suffix) => `${Math.floor(value).toLocaleString()}${suffix || ""}`;

if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count || "0");
      const suffix = element.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = formatCounter(target * eased, suffix);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(element);
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

document.querySelectorAll("form[data-static-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector("[data-form-note]");
    if (note) {
      note.textContent = "Thank you. This static form is ready to connect to your preferred email or CRM workflow.";
    }
    form.reset();
  });
});
