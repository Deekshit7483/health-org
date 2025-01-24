// Select hamburger menu and nav links
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle menu visibility
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
