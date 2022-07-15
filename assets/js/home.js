const handleMainSlider = () => {
  const prevBtn = $("#main-slider-prev");
  const nextBtn = $("#main-slider-next");
  const slides = $All(".main-slide");
  let activeSlide = 1;

  const moveSlider = () => {
    activeSlide = activeSlide > slides.length - 1 ? 0 : activeSlide < 0 ? slides.length - 1 : activeSlide;
    for (let slide of slides) {
      slide.style.opacity = 0;
    }
    slides[activeSlide].style.opacity = 1;
  }

  prevBtn.addEventListener("click", () => {
    activeSlide -= 1;
    moveSlider();
    console.log(activeSlide)
  });

  nextBtn.addEventListener("click", () => {
    activeSlide += 1;
    moveSlider();
    console.log(activeSlide)
  });

  setInterval(() => {
    activeSlide += 1;
    moveSlider();
  }, 10000);
}

const handleAboutVideoPlay = () => {
  const playBtn = $("#play-about-video");
  const video = $("#about-video");

  playBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playBtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
      playBtn.classList.add("opacity-0");
    } else {
      video.pause();
      playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
      playBtn.classList.remove("opacity-0")
    }
  })
}



window.addEventListener("DOMContentLoaded", () => {
  handleMainSlider();
  handleAboutVideoPlay();
});

