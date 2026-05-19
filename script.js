// ═══════════════════════════════════════════════
//  Olive Dental Care Pvt. Ltd. — JavaScript
// ═══════════════════════════════════════════════

// ── Navbar: add shadow on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ── Mobile hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close menu when a nav link is clicked (mobile only)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) navLinks.classList.remove("open");
  });
});

// ── Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ── Hero carousel (full-screen, 5 slides)
(function () {
  const INTERVAL = 5000; // ms per slide

  const heroEl = document.querySelector('.hero');
  if (!heroEl) return;

  const slides   = Array.from(heroEl.querySelectorAll('.hero-slider .slide'));
  const dots     = Array.from(heroEl.querySelectorAll('.slide-dot'));
  const progress = heroEl.querySelector('.hero-progress');
  if (!slides.length) return;

  let current = 0;
  let timer   = null;
  let progTimer = null;

  const showSlide = (index) => {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i)   => d.classList.toggle('active', i === index));
    current = index;
    startProgress();
  };

  const next = () => showSlide((current + 1) % slides.length);

  const startProgress = () => {
    if (progress) {
      progress.style.transition = 'none';
      progress.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transition = `width ${INTERVAL}ms linear`;
          progress.style.width = '100%';
        });
      });
    }
  };

  const startAuto = () => {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
    startProgress();
  };

  const stopAuto = () => {
    clearInterval(timer);
    if (progress) { progress.style.transition = 'none'; progress.style.width = '0'; }
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { showSlide(i); clearInterval(timer); startAuto(); });
  });

  heroEl.addEventListener('mouseenter', stopAuto);
  heroEl.addEventListener('mouseleave', startAuto);

  // Touch/swipe support
  let touchStartX = 0;
  heroEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroEl.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { showSlide(dx < 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length); startAuto(); }
  }, { passive: true });

  startAuto();
})();

// ── Appointment form submission
function submitForm() {
  const name = document.getElementById("f-name").value.trim();
  const phone = document.getElementById("f-phone").value.trim();

  if (!name || !phone) {
    alert("Please enter your name and phone number to continue.");
    return;
  }

  // Show success message
  const successEl = document.getElementById("form-success");
  successEl.style.display = "block";

  // Clear all fields
  const fieldIds = ["f-name", "f-phone", "f-email", "f-date", "f-msg"];
  fieldIds.forEach((id) => {
    document.getElementById(id).value = "";
  });
  const serviceSelect = document.getElementById("f-service");
  serviceSelect.selectedIndex = 0;

  // Hide success message after 5 seconds
  setTimeout(() => {
    successEl.style.display = "none";
  }, 5000);
}
