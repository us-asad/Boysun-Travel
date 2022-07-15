const $ = el => document.querySelector(el);
const $All = el => document.querySelectorAll(el);

const handleNavbarOpenMenu = () => {
  const arrowsContainer = $("#navbar-arrows");
  const mobileNavbar = $("#mobile-navbar");
  let isOpened = false;

  arrowsContainer.addEventListener("click", () => {
    isOpened = !isOpened

    if (isOpened) {
      arrowsContainer.children[0].classList.add("rotate-[45deg]", "top-[6px]");
      arrowsContainer.children[1].classList.add("rotate-[-45deg]");
      arrowsContainer.children[2].classList.add("opacity-0");
      mobileNavbar.style.maxHeight = "235px";
    } else {
      arrowsContainer.children[0].classList.remove("rotate-[45deg]", "top-[6px]");
      arrowsContainer.children[1].classList.remove("rotate-[-45deg]");
      arrowsContainer.children[2].classList.remove("opacity-0");
      mobileNavbar.style.maxHeight = 0;
    }
  });

}

const navbar = $("#navbar")
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    navbar.classList.remove("non-fixed-header");
    navbar.classList.add("fixed-header");
  } else {
    navbar.classList.remove("fixed-header");
    navbar.classList.add("non-fixed-header");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  handleNavbarOpenMenu();
});


