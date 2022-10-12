let toggle = document.querySelector(".toggle");
let nav = document.querySelector("nav");
let close = document.querySelector(".close");

toggle.onclick = () => {
  nav.classList.add("open");
};
close.onclick = () => {
  nav.classList.remove("open");
};

document.onkeyup = function (e) {
  console.log(e);
  if (e.key === "Escape") {
    nav.classList.remove("open");
  }
};
