
window.addEventListener("DOMContentLoaded", () => {
  console.log('loaded');
  const options = {
    rewind: true,
    arrows: true,
    autoplay: true,
    drag: true,
    pagination: false,
    focus: 'center',
    type: "loop",
    trimSpace: true,
    perPage: 3,
    breakpoints: {
      1024: {
        perPage: 2
      },
      768: {
        perPage: 1
      }
    }
  };

  var splide = new Splide(".splide", options).mount();
  
  console.log(splide);
})
