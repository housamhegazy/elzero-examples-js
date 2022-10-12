let arrow = document.querySelector(".fa-arrow-up");

window.onscroll = function () {
  this.scrollY >= 1000
    ? arrow.classList.add("show")
    : arrow.classList.remove("show");
};

arrow.onclick = function (){
    window.scrollTo({
        top:0,
        behavior:"smooth",
    })
}