const clickSlide = () => {
  const clickPos = event.clientX / window.innerWidth;
  if (clickPos >= 0.5) {
    incImage(1);
  } else {
    incImage(-1);
  }
}

const handleOverlap = (newImage) => {
  toggleEventListeners(0);
  setTimeout(() => {
    toggleTransition(0);
    whichImage = newImage;
    updateImage();
    setTimeout(() => {
      toggleTransition(1);
      toggleEventListeners(1);
    }, 200);
  }, slideTransition);
}

const detectOverlap = () => {
  const minImage = overlap;
  const maxImage = imageArray.length - overlap - 1;
  const moveBy = imageArray.length - overlap * 2;
  updateImage();
  if (whichImage > maxImage) {
    handleOverlap(whichImage - moveBy);
  } else if (whichImage < minImage) {
    handleOverlap(whichImage + moveBy);
  }
}

const incImage = (incAmount = 1) => {
  whichImage += incAmount;
  detectOverlap();
}

const createDopplegangers = (ovr) => {
  const slides = slideshowSlides.children;
  const cloneStart = [];
  const cloneEnd = [];
  for (let i = 0; i < ovr; i++) {
    cloneStart.push(slides[i].cloneNode(true));
    cloneEnd.push(slides[slides.length - 1 - i].cloneNode(true));
  }
  cloneStart.forEach(clone => {
    slideshowSlides.appendChild(clone);
  });
  cloneEnd.forEach(clone => {
    slideshowSlides.insertBefore(clone, slideshowSlides.children[0]);
  });
}

const handleImageLoading = () => {
  let i = imageArray.length;

  // possibly remove this setTimeout
  setTimeout(() => {
    if (i > 0) {
      console.log("timed out, finishing setup");
      finishSetup();
    }
  }, 8000);

  imageArray.forEach((img, index) => {
    // if image is cached, i--, else i-- when image finishes loading
    if (img.complete) {
      i--;
    } else {
      img.onload = function() {
        i--;
        if (i <= 0) {
          finishSetup();
        }
      };
    }

    // wait until remaining images are loaded then finish setup
    if (i <= 0) {
      finishSetup();
    }
  });
}

const finishSetup = () => {
  updateWidthArray();
  createThumbs();
  window.addEventListener("resize", function() {
    updateWidthArray();
    updateImage();
    updateThumbsWidth();
  });
  slideshowSlides.addEventListener("click", clickSlide);
  updateImage();
  console.log("SETUP COMPLETE, HAVE A NICE DAY");
}

const updateWidthArray = () => {
  imageArray.forEach((img, index) => {
    imageWidthArray[index] = img.width + imageGap;
  });
}

const updateThumbsWidth = () => {
  const visibleThumbs = imageArray.length;
  const thumbSize =
    window.getComputedStyle(slideshow).getPropertyValue("--thumb-size") * 1;
  const thumbsWidth =
    visibleThumbs * thumbSize + (visibleThumbs - 1) * imageGap;
  slideshow.style.setProperty("--thumbs-width", thumbsWidth);
}

const createThumbs = () => {
  const thumbsWrapper = document.createElement("div");
  const thumbsDiv = document.createElement("div");
  thumbsWrapper.classList.add("js-slideshow__thumbs-wrapper");
  thumbsDiv.classList.add("js-slideshow__thumbs");

  imageArray.forEach((img, index) => {
    const imageClone = img.cloneNode(true);
    const imageFigure = document.createElement("figure");
    imageFigure.classList.add("js-slideshow__thumb-image");
    imageFigure.addEventListener("click", () => {
      whichImage = index;
      detectOverlap();
      updateImage();
    });
    imageFigure.appendChild(imageClone);
    thumbsDiv.appendChild(imageFigure);
  });

  thumbsWrapper.appendChild(thumbsDiv);
  slideshow.appendChild(thumbsWrapper);
  updateThumbsWidth();
}

const toggleTransition = (val) => {
  const offsetTime = val * slideTransition / 1000 + "s";
  slideshow.style.setProperty("--offset-time", offsetTime);
}

const toggleEventListeners = (toggle) => {
  if (toggle === 0) {
    slideshowSlides.removeEventListener("click", clickSlide);
    slideshowSlides.removeEventListener("touchstart", handleTouchStart, false);
    slideshowSlides.removeEventListener("touchmove", handleTouchMove, false);
  } else {
    slideshowSlides.addEventListener("click", clickSlide);
    slideshowSlides.addEventListener("touchstart", handleTouchStart, false);
    slideshowSlides.addEventListener("touchmove", handleTouchMove, false);
  }
}

const getImagePos = (arr, index) => {
  const modIndex = index % arr.length;

  if (modIndex > 0) {
    const leftArray = arr.slice(0, modIndex);
    return (
      leftArray.reduce((total, amount) => total + amount) + arr[modIndex] * 0.5
    );
  } else {
    return arr[modIndex] * 0.5;
  }
}

const updateImage = () => {
  const thumbs = document.querySelectorAll(
    "#jsSlideshow .js-slideshow__thumb-image"
  );
  clearInterval(autoUpdate);
  autoUpdate = setInterval(() => {
    incImage();
  }, slideSpeed);
  const newOffset = getImagePos(imageWidthArray, whichImage);
  slideshow.style.setProperty("--offset", newOffset + "px");
  thumbs.forEach(thumb => {
    thumb.classList.remove("js-slideshow__thumb-image--selected");
  });
  thumbs[whichImage].classList.add("js-slideshow__thumb-image--selected");
  thumbs[whichImage].scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center"
  });
}

const slideshow = document.querySelector("#jsSlideshow");
const slideshowSlides = slideshow.querySelector(".js-slideshow__slides");
const slideSpeed = slideshow.dataset.speed * 1000;
const slideTransition = slideshow.dataset.transition * 1000;
const overlap = 3; // how many images are duplicated at beginning & end
let whichImage = overlap;
let autoUpdate = setInterval(() => {
  incImage();
}, slideSpeed);
createDopplegangers(overlap);
const imageArray = slideshowSlides.querySelectorAll("img");
const imageGap =
  window.getComputedStyle(slideshow).getPropertyValue("--image-gap") * 1;
const imageWidthArray = [];
handleImageLoading();
toggleTransition(1);

// swipe gestures from https://stackoverflow.com/questions/15084675/how-to-implement-swipe-gestures-for-mobile-devices
slideshowSlides.addEventListener("touchstart", handleTouchStart, false);
slideshowSlides.addEventListener("touchmove", handleTouchMove, false);
var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      incImage(1);
    } else {
      incImage(-1);
    }
  }

  xDown = null;
  yDown = null;
}
