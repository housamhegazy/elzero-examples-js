let sections = document.querySelectorAll("li");
let galleryImgs = Array.from(document.querySelectorAll(".gallery .all"));

sections.forEach((li) => {
  li.addEventListener("click", removeActive);
  li.addEventListener("click", addElements);
});

function removeActive() {
  sections.forEach((li) => {
    li.classList.remove("active");
    this.classList.add("active");
  });
}

function addElements() {
  galleryImgs.forEach((img) => {
    img.style.display = "none";
  });
  document.querySelectorAll(this.dataset.cat).forEach((e) => {
    e.style.display = "block";
  });
}
