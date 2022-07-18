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
    btn.addEventListener("click", () => {
      toggleData(1, "all");
    });
  }

  modalCloser.addEventListener("click", () => {
    toggleData(0, "none");
  });

  modalOverlay.addEventListener("click", () => {
    toggleData(0, "none")
  })
}

const handleLanguage = () => {
  const l = localStorage.getItem("lang");
  const lang = l ? JSON.parse(l) : null;
  const changeLocaltionByLang = lang => {
    localStorage.setItem("lang", lang);
    window.location.pathname = `/${lang}`;
  }

  if (window.location.pathname === "/") {
    window.location.pathname = `/${lang || "eng"}`;
  }

  const LangToEngBtns = $All(".lang-to-eng");
  const LangToUzBtns = $All(".lang-to-uz");
  const LangToRuBtns = $All(".lang-to-ru");

  for (let langToEngBtn of LangToEngBtns) {
    langToEngBtn.addEventListener("click", () => changeLocaltionByLang("eng"));
  }

  for (let langToRuBtn of LangToRuBtns) {
    langToRuBtn.addEventListener("click", () => changeLocaltionByLang("ru"));
  }

  for (let langToUzBtn of LangToUzBtns) {
    langToUzBtn.addEventListener("click", () => changeLocaltionByLang("uz"));
  }
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
  handleLanguage();

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


