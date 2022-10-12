//start local storage
//check if there is color in local storage
let mainColor = window.localStorage.getItem("color");
if (mainColor !== null) {
  // get color from local storage
  document.documentElement.style.setProperty("--main-color", mainColor);

  // remove active class from all children
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    // add class active to element with data color equal to local storage item
    if (ele.dataset.color === mainColor) {
      ele.classList.add("active");
    };
  });
};

// random background option 
let backgroundOption = true;

//variable to control the interval 
let backgroundInterval;

//check if there is random background item in local storage
let localBackgroundItem = window.localStorage.getItem("background-option");
if (localBackgroundItem !== null) {
  
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
    if (localBackgroundItem === "true") {
      backgroundOption = true
      document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
      backgroundOption = false
      document.querySelector(".random-backgrounds .no").classList.add("active");
    }
  });
} 

// bullets option in local storage
let buttons = document.querySelectorAll(".testing-option span");
let bulletContainer = document.querySelector(".nav-bullets");

let bulletStyle = window.localStorage.getItem("display");
if (bulletStyle !== null) {
  buttons.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (bulletStyle === "block") {
    bulletContainer.style.display = "block"
    document.querySelector(".testing-option .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".testing-option .no").classList.add("active");
  }
  }
//===============================================
// end local storage
//===============================================
//start gear settings
document.querySelector("i").onclick = function () {
  // toggle class fa-spin for rotation
  this.classList.toggle("fa-spin");
  //toggle class open for main setting box
  document.querySelector(".settings-box").classList.toggle("open");
};
// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
//loop in all list items
colorsLi.forEach((li) => {
  //click on every list item
  li.addEventListener("click", (e) => {
    // set color on road
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    //set color on local storage
    window.localStorage.setItem("color", e.target.dataset.color);

    // remove active class from all children 
    handleActive(e);
  });
})
//====================================================
//====================================================
// switch buttons
let randomBackEle = document.querySelectorAll(".random-backgrounds span");
randomBackEle.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    //============buttons==============
    if (e.target.dataset.background === "yes") {
      backgroundOption = true; // اجعلها ترو وشغل الفانكشن
      randomizeImg();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval); // اجعلها فولس واعمل كلير
      localStorage.setItem("background-option", false);
    }
  });
});
  
// start bullets option

buttons.forEach(ele => {
  ele.addEventListener("click", (e => {
    if (ele.classList.contains("yes")) {
      bulletContainer.style.display = "block";
      window.localStorage.setItem("display", "block");
    } else {
      bulletContainer.style.display = "none";
      window.localStorage.setItem("display", "none");
    }
    handleActive(e);
  }))
})

//=====================================================
//=====================================================
//select landing page element
let landingPage = document.querySelector(".landing-page");
// get array of images
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
//function to randomize image
function randomizeImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //get random number
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      //change background img url
      landingPage.style.backgroundImage =
        'url("images/' + imgArray[randomNumber] + '")';
    }, 10000);
  }
}
randomizeImg();

// start skills
// skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  //skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  //window height
  let windowHeight = this.innerHeight;
  //window scroll top
  let windowScrollTop = this.pageYOffset;
  
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress
    })
  }
}
//end skills

// start gallery
// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(image => {
  image.addEventListener("click", (e => {
    //create overlay element
    let overlay = document.createElement("div");
    //add class to overlay
    overlay.className = "popup-overlay";
    // append overlay to body
    document.body.appendChild(overlay);
    //create the popup
    let popupBox = document.createElement("div");
    //add class to popup
    popupBox.className = "popup-box";

    //===================
    // بنحط العنوان هنا عشان يظهر قبل الصوره
    if (image.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");
      //create text for heading
      let headingText = document.createTextNode(image.alt);
      //append headingText to img heading
      imgHeading.appendChild(headingText);
      //append imgheading to popup box
      popupBox.appendChild(imgHeading);
    }
    //=============

    //create the image
    let popupImage = document.createElement("img");
    //set image src
    popupImage.src = image.src;
    //add popupImage to popupBox
    popupBox.appendChild(popupImage);
    //add popupBox to body
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement("span");
    // create the close text
    let closeButtonText = document.createTextNode("X");
    //append text to closebutton
    closeButton.appendChild(closeButtonText);
    // add class to closeButton
    closeButton.className = "close-button";
    // add closeButton to popupBox
    popupBox.appendChild(closeButton);
  }))
});
// close popup
document.addEventListener("click", (e) => {
  if (
    e.target.className == "close-button" ||
    e.target.className == "popup-overlay"
  ) {
    //remove the current popup
    document.querySelector(".popup-box").remove()
    // remove the overlay
    document.querySelector(".popup-overlay").remove();
  }
})
// end gallery
//start bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSomeWhere(allBullets);
//end bullets
let allLinks = document.querySelectorAll(".header-area .links a");
scrollToSomeWhere(allLinks);

// handle scroll to some where
function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// handle active status
function handleActive(ev) {
  // remove active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // add active class on self
  ev.target.classList.add("active");
}

// start reset button
let resetButton = document.querySelector(".reset-option");
resetButton.onclick = function(){
  //local storage.remove() or .clear() to remove everything
  // localStorage.clear()
  window.localStorage.removeItem("color");
  window.localStorage.removeItem("background-option");
  window.localStorage.removeItem("display");
  // reload page
  window.location.reload()
}


// start toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".header-area .links");

toggleMenu.onclick = function(){
  //add active class to toggle menu
  toggleMenu.classList.toggle("menu-active");
  links.classList.toggle("open");
}

document.addEventListener("click" , (e =>{
  if (e.target !== toggleMenu && e.target !== links) {
    //check if menu is opened
    if (links.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
}))

links.onclick = function (e) {
  e.stopPropagation()
}
