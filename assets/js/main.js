const $ = el => document.querySelector(el);
const $All = el => document.querySelectorAll(el);
const usernameRegEx = /^[a-zA-Z\-]+$/;

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

const handleResgisterValidation = () => {
  const submit = $("#register-form");
  const email = $("#register-email");
  const pass = $("#register-password");
  const passCon = $("#register-passwordConfirm");
  const username = $("#register-username");
  const name = $("#register-name");
  const phone = $("#register-phone");
  const error = $("#register-error");

  const callError = err_text => {
    error.innerText = err_text;
  }

  submit.addEventListener("submit", async e => {
    e.preventDefault();
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    const emailValResult = String(email.value)
      .toLowerCase()
      .match(emailRegEx);

    const phoneValResult = String(phone.value)
      .toLowerCase()
      .match(phoneRegEx);

    const usernameValResult = String(username.value)
      .toLowerCase()
      .match(usernameRegEx);

    if (name.value.length < 5) return callError("Ism Familiya 5 tadan kam bo'lmasligi shart!");

    if (!emailValResult) return callError("Iltimos to'g'ri elektron pochta kiriting!");

    if (!phoneValResult) return callError("Iltimos to'g'ri telefon raqam kiriting!");

    if (pass.value.length < 8 || passCon.value.lengh < 8) return callError("Parol kamida 8 ta belgidan iborat bo'lishi shart!");

    if (pass.value !== passCon.value) return callError("Parollari bir xil bo'lishi shart!");

    if (username.value.length < 3) return callError("Tahallus 3tadan kam bo'lmasligi shart!");

    if (!usernameValResult) return callError("tahallus faqat katta kichik harflar va - belgisidan tashkil topishi mumkin!");

    const res = await fetch("https://my-travel.uz/eng/user/getusers");
    const users = await res.json();

    for (let user of users) {
      if (user.userName === username.value) return callError("Ushbu tahallus allaqachon ishlatilgan, Iltimos boshqa tahallus yozing!");

      if (user.email === email.value) return callError("Ushbu Elektron pochta ishlatilgan, Iltimos boshqa elektron pochta yozing!");
    }

    callError("");

    const body = {
      fullName: name.value,
      userName: username.value,
      email: email.value,
      phone: phone.value,
      pass: pass.value,
      passRepeat: passCon.value
    }

    const registerRes = await fetch("https://my-travel.uz/eng/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await registerRes.json();

    window.location = data.url;
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
  const lang = localStorage.getItem("lang");
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

const handleChangeForm = () => {
  const registerBtn = $("#show-register-btn");
  const loginBtn = $("#show-login-btn");
  const registerForm = $("#register-form")
  const loginForm = $("#login-form");
  let showLoginForm = 1;

  const changeAuthPage = () => {
    if (showLoginForm) {
      loginForm.classList.remove("hide-form");
      registerForm.classList.add("hide-form");
      registerBtn.classList.remove("border-blue");
      loginBtn.classList.add("border-blue");
    } else {
      loginForm.classList.add("hide-form");
      registerForm.classList.remove("hide-form");
      registerBtn.classList.add("border-blue");
      loginBtn.classList.remove("border-blue");
    }
  }

  registerBtn.addEventListener("click", () => {
    showLoginForm = 0;
    changeAuthPage();
  });

  loginBtn.addEventListener("click", () => {
    showLoginForm = 1;
    changeAuthPage();
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
  handleLanguage();
  handleChangeForm();
  handleResgisterValidation();

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


