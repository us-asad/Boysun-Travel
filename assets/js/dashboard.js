const handleChangeProfileImg = () => {
  const imgInput = $("#profile-image");
  const profileImg = $("#profile-img")

  imgInput.addEventListener("change", () => {
    const file = imgInput.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")
      profileImg.src = URL.createObjectURL(imgInput.files[0]);
    else
      alert("Faqatgina PNG va JPG formatidagi rasmlar qabul qilinadi!");
  })
}

window.addEventListener("DOMContentLoaded", () => {
  handleChangeProfileImg();
});