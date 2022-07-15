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

const handleAuthModal = () => {
  console.log("worked")
  const modalOverlay = $("#login-modal-overlay");
  const modal = $("#login-modal");
  const modalCloser = $("#login-modal-closer");
  const modalOpener = $All(".login-modal-opener");
  const toggleData = (opacity, pointerEvents) => {
    modal.style.opacity = opacity;
    modal.style.pointerEvents = pointerEvents;
    modalOverlay.style.opacity = opacity;
    modalOverlay.style.pointerEvents = pointerEvents;
    document.body.style.overflowY = !opacity ? "auto" : "hidden";
  }
  
  for (btn of modalOpener) {
    console.log(btn)
    btn.addEventListener("click", () => {
      console.log("clicked")
      toggleData(1, "all");
    });
  }
  
  modalCloser.addEventListener("click", () => {
    console.log("clicked")
    toggleData(0, "none");
  });

  modalOverlay.addEventListener("click", () => {
    toggleData(0, "none")
  })
}

const navbar = $("#navbar")
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    navbar.classList.remove("non-fixed-header");
    navbar.classList.add("fixed-header", "shadow-lg");
  } else {
    navbar.classList.remove("fixed-header", "shadow-lg");
    navbar.classList.add("non-fixed-header");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  handleNavbarOpenMenu();
  handleAuthModal();

  tailwind.config = {
    theme: {
      extend: {
        colors: {
          "main-green-100": "#345E41",
          "main-green-200": "#1c231f",
          "main-black-100": "#8a8a8a6b",
          "main-gray-100": "#484848",
          "white-100": "#e6e6e696",
          "white-200": "#bcbcbc",
        },
        boxShadow: {
          1: "-1px 0px 20px 0px #bebebe",
        },
      },
    },
  };
});


