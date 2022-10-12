let sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
// get number of slides
let slidesCount = sliderImages.length;
//set current slide
let currentSlide = 1;
//slide number element
let slideNumber = document.querySelector(".slide-number");
// prev and next btn
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
//handle click on prev and next btn
nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

//create the main ul element
let pagInationElement = document.createElement("ul");
pagInationElement.id = "pagination-ul";
// create list item based on slides count

for (let i = 1; i <= slidesCount; i++) {
  let paginationItem = document.createElement("li");
  paginationItem.setAttribute("data-index", i);
  let paginationItemText = document.createTextNode(i);
  paginationItem.appendChild(paginationItemText);
  pagInationElement.appendChild(paginationItem);
}
let indicatorsEle = document.querySelector(".indicators");
indicatorsEle.appendChild(pagInationElement);

let ul = document.querySelector("#pagination-ul");
let bullets = Array.from(document.querySelectorAll("#pagination-ul li"));

function nextSlide() {
    if(nextBtn.classList.contains("disabled")){
        return false;
    }else{
        currentSlide++;
        checker();
    }
}

function prevSlide() {
    if (prevBtn.classList.contains("disabled")) {
      return false;
    } else {
      currentSlide--;
      checker();
    }
}

// checker function
function checker() {
  //set the slide number
  slideNumber.textContent = `slide ${currentSlide} from ${slidesCount}`;
  removeActive();
  //set active on current slide
  sliderImages[currentSlide - 1].classList.add("active")
  ul.children[currentSlide - 1].classList.add("active");
//handle prev btn
  if (currentSlide === 1) {
    //add class disable on prev btn
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  //handel next btn
  if (currentSlide === slidesCount) {
    //add class disable on prev btn
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

// remove active
function removeActive() {
  sliderImages.forEach((slide) => {
    slide.classList.remove("active");
  });
  bullets.forEach((bullet) => {
    bullet.classList.remove("active");
  });
}
checker();

bullets.forEach(bullet=>{
    bullet.addEventListener("click",(e=>{
        // console.log(e.currentTarget.dataset.index);
        currentSlide = parseInt(e.currentTarget.dataset.index);
        checker();
    }))
})