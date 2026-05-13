// ═══════════════════════════════════════════════
//  Olive Dental Care Pvt. Ltd. — JavaScript
// ═══════════════════════════════════════════════

// ── Navbar: add shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Appointment form submission
function submitForm() {
  const name  = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();

  if (!name || !phone) {
    alert('Please enter your name and phone number to continue.');
    return;
  }

  // Show success message
  const successEl = document.getElementById('form-success');
  successEl.style.display = 'block';

  // Clear all fields
  const fieldIds = ['f-name', 'f-phone', 'f-email', 'f-date', 'f-msg'];
  fieldIds.forEach(id => {
    document.getElementById(id).value = '';
  });
  const serviceSelect = document.getElementById('f-service');
  serviceSelect.selectedIndex = 0;

  // Hide success message after 5 seconds
  setTimeout(() => {
    successEl.style.display = 'none';
  }, 5000);
}
