let btns = document.querySelectorAll("ul li");
let texts = document.querySelectorAll(".text");

btns.forEach((ele) => {
  ele.addEventListener("click", handleActive);
  ele.addEventListener("click", addElement);
});

function handleActive() {
  btns.forEach((ele) => {
    ele.classList.remove("active");
  });
  this.classList.add("active");
}
function addElement() {
  texts.forEach((txt) => {
    txt.classList.remove("active");
    if (this.classList.contains(txt.dataset.name)) {
      txt.classList.add("active");
    }
  });
}
