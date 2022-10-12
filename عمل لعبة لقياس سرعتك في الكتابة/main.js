/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

const levels = {
  easy: 5,
  normal: 3,
  hard: 2,
};

//default level
let defaultLevelNme = "normal";
let defaultLevelSecondes = levels[defaultLevelNme];

// catch selectors
let startBtn = document.querySelector(".start");
let levelName = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let Input = document.querySelector("input");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let instructionBox = document.querySelector(".instruction");

//setting level name + seconds + score

levelName.innerHTML = defaultLevelNme;
secondsSpan.innerHTML = defaultLevelSecondes;
timeLeft.innerHTML = defaultLevelSecondes;
scoreTotal.innerHTML = words.length;
instructionBox.innerHTML = `instructions:<div> this level is : ${defaultLevelNme}</div>
                <div>and you will take : ${defaultLevelSecondes} secondes to write every word</div><br/>goodluck`;

//start select box
const Button = document.querySelector(".message button");
const selectBox = document.querySelector("#selectBox");

Button.onclick = (e) => {
  e.preventDefault();
  //function to select level
  selectLvl();
};

//get history from local storage
let arr = [];
let date = new Date();
getFromLocalStorage();

// disable paste event
Input.onpaste = function () {
  return false;
};
//start game
startBtn.onclick = function () {
  this.remove();
  Input.focus();
  //filter
  filterItems(words);
  selectBox.remove();
  Button.remove();
};

//filter function
function filterItems(words) {
  if (levelName.innerHTML === Object.keys(levels)[0]) {
    words = words.filter((ele) => {
      return ele.length < 5;
    });
  } else if (levelName.innerHTML === Object.keys(levels)[1]) {
    words = words.filter((ele) => {
      return ele.length < 7;
    });
  } else {
    words = words.filter((ele) => {
      return ele.length > 7;
    });
  }
  scoreTotal.innerHTML = words.length;
  //generate function
  genWords(words);
}

function genWords(choosedWords) {
  //get random word from array
  let randomWord =
    choosedWords[Math.floor(Math.random() * choosedWords.length)];
  let wordIndex = choosedWords.indexOf(randomWord);

  //remove word from array
  choosedWords.splice(wordIndex, 1);
  //show the random word
  theWord.innerHTML = randomWord;
  //empty upcoming word
  upcomingWords.innerHTML = "";
  //generate words
  for (let i = 0; i < choosedWords.length; i++) {
    //create div element
    let div = document.createElement("div");
    let text = document.createTextNode(choosedWords[i]);
    div.appendChild(text);
    upcomingWords.appendChild(div);
  }
  //call start play function
  startPlay(choosedWords);
}
function startPlay(choosedWords) {
  timeLeft.innerHTML = levels[selectBox.value];
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(start);
      //compare words
      if (theWord.innerHTML.toLowerCase() === Input.value.toLowerCase()) {
        //empty input field
        Input.value = "";
        //increase score
        scoreGot.innerHTML++;
        if (choosedWords.length > 0) {
          //call generate word function
          genWords(choosedWords);
        } else {
          let span = document.createElement("span");
          span.classList.add("good");
          let spanText = document.createTextNode("congratulation");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          //remove upcoming words box
          upcomingWords.remove();
          //add to local storage
          addLocalStorage();
        }
      } else {
        let span = document.createElement("span");
        span.classList.add("bad");
        let spanText = document.createTextNode("game over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

function getFromLocalStorage() {
  if (localStorage.getItem("item") === null) {
    let historyElementContainer = document.querySelector(".history");
    historyElementContainer.innerHTML = `no data to show`;
  } else {
    let storageHistory = JSON.parse(localStorage.getItem("item"));
    arr.push(...storageHistory);
    //get only last 3 dates from history
    if (arr.length > 3) {
      let arr2 = arr.slice(-3);
      console.log(arr2);
      //add it to page
      addElements(arr2);
    } else {
      addElements(arr);
    }
  }
}

function addLocalStorage() {
  let resultHistory = `you completed game in : ${date}`;
  arr.push(resultHistory);
  localStorage.setItem("item", JSON.stringify(arr));
}

//add elements from local storage to history element
function addElements(arr) {
  let historyElementContainer = document.querySelector(".history");
  arr.forEach((ele) => {
    let historyEle = document.createElement("div");
    let historyText = document.createTextNode(ele);
    historyEle.appendChild(historyText);
    historyElementContainer.appendChild(historyEle);
  });
}

//selectbox function
function selectLvl() {
  if (Object.keys(levels).includes(selectBox.value)) {
    levelName.innerHTML = selectBox.value;
    secondsSpan.innerHTML = levels[selectBox.value];
    timeLeft.innerHTML = levels[selectBox.value];
    instructionBox.innerHTML = `instructions:<div> level : ${selectBox.value}</div> 
                <div>Time : ${levels[selectBox.value]} secondes </div>   goodluck`;
  }
}