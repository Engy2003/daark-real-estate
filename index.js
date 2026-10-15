const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("header nav");
const navLinks = document.querySelectorAll("header nav a");

function updateHeaderOffset() {
  if (!header) return;
  const heightInRem = header.offsetHeight / 16;
  document.documentElement.style.setProperty(
    "--header-height",
    `${heightInRem}rem`,
  );
}

function closeMenu() {
  if (!menuToggle || !nav) return;
  menuToggle.classList.remove("active");
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "فتح القائمة");
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "إغلاق القائمة" : "فتح القائمة",
    );
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      updateHeaderOffset();
    });
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target) && nav.classList.contains("open")) {
      closeMenu();
    }
  });
}

window.addEventListener("load", updateHeaderOffset);
window.addEventListener("resize", updateHeaderOffset);
updateHeaderOffset();
