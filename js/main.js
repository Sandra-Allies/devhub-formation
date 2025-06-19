document.addEventListener("DOMContentLoaded", () => {
  // Ton code ici
  const links = document.querySelectorAll(".nav-fixed a");
  const currentUrl = window.location.pathname;

  links.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("active");
    }
  });
});
