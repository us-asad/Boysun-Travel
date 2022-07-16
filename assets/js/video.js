
const handleAboutVideoPlay = () => {
  const playBtn = $("#play-about-video");
  const video = $("#about-video");
  const videoThumbnail = $("#about-video-thumbnail");

  video.addEventListener("ended", () => {
    playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
    playBtn.classList.remove("opacity-40");
    videoThumbnail.style.backgroundImage = "url(/assets/images/demos/1.jpg)";
  });

  playBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playBtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
      playBtn.classList.add("opacity-40");
      videoThumbnail.style.backgroundImage = "none";
    } else {
      video.pause();
      playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
      playBtn.classList.remove("opacity-40");
      videoThumbnail.style.backgroundImage = "url(/assets/images/demos/1.jpg)";
    }
  })
}

window.addEventListener("DOMContentLoaded", () => {
  handleAboutVideoPlay();
})