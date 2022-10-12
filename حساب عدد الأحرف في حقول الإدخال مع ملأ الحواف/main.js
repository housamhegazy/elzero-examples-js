let input = document.querySelector("input");
let count = document.querySelector(".count");
let progress = document.querySelector(".progress");
let maxLength = parseInt(input.getAttribute("maxlength"));
count.innerHTML = maxLength - input.value.length;

input.oninput = function () {
  count.innerHTML = maxLength - input.value.length;
  // Set The Progress
  progress.style.width = `${(this.value.length * 100) / maxLength}%`;
  count.innerHTML == 0
    ? count.classList.add("zero")
    : count.classList.remove("zero");
};
