//select elements

let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submit-button");
let countDownEle = document.querySelector(".count-down");

let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;
// get data from json file or from url api
function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;
      // create bullets + set questions count
      createBullets(qCount);
      // add Question data
      addData(questionsObject[currentIndex], qCount);
      //start count down
      countDown(5, qCount);
      //click on submit
      submitBtn.onclick = () => {
        //get right answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        currentIndex++;
        //check the answer
        checkAnswer(theRightAnswer, qCount);
        //remove prev question and answer
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        //add next question and answer
        addData(questionsObject[currentIndex], qCount);
        //handle Bullets classes
        handleBullets();
        // stop count down
        clearInterval(countDownInterval);
        //start new count down
        countDown(5, qCount);
        // show results
        showResults(qCount);
      };
    }
  };
  myRequest.open("GET", "data.json", true);
  myRequest.send();
}
getQuestions();

//create the bullets function
function createBullets(num) {
  countSpan.innerHTML = num;
  // create bullets spans
  for (let i = 0; i < num; i++) {
    let theBullet = document.createElement("span");
    // check if it first span
    if (i === 0) {
      theBullet.className = "on";
    }
    bulletContainer.appendChild(theBullet);
  }
}

// add data function
function addData(obj, count) {
  if (currentIndex < count) {
    //create h2 question title
    let questionTitle = document.createElement("h2");
    // create question text
    let questionText = document.createTextNode(obj.title);
    //append text to title
    questionTitle.appendChild(questionText);
    //append question title to quizArea
    quizArea.appendChild(questionTitle);
    // create answers
    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      //create main answer div
      mainDiv.className = "answer";
      //create radio button
      let radioInput = document.createElement("input");
      //add type , name , id, data-attribute to radio
      radioInput.id = `answer_${[i]}`;
      radioInput.type = "radio";
      radioInput.name = "questions";
      radioInput.dataset.answer = obj[`answer_${[i]}`];
      //make first option selected
      if (i === 1) {
        radioInput.checked = true;
      }
      // create label div
      let label = document.createElement("label");
      //add for attribute
      label.htmlFor = `answer_${[i]}`;
      //create text label
      let theLabelText = document.createTextNode(obj[`answer_${[i]}`]);
      // add text to label
      label.appendChild(theLabelText);
      //add input + label to main div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(label);
      //append mainDiv to answers area
      answersArea.appendChild(mainDiv);
    }
  }
}

// check answers function
function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("questions");
  let theChoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

// handleBullets()

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  bulletsSpans.forEach((ele, index) => {
    if (index === currentIndex) {
      ele.className = "on";
    }
  });
}

// show results function
function showResults(count) {
  let theResults = document.querySelector(".results");

  if (currentIndex === count) {
    let theResult;
    quizArea.remove();
    answersArea.remove();
    submitBtn.remove();
    bullets.remove();
    if (rightAnswers === count) {
      theResult = `<span class="perfect">perfect</span>`;
    } else if (rightAnswers > count / 2 && rightAnswers < count) {
      theResult = `<span class="good">good</span>`;
    } else {
      theResult = `<span class="bad">bad</span>`;
    }
    theResults.innerHTML = `${theResult} : you answered ${rightAnswers} from ${count} questions`;
    theResults.getElementsByClassName.padding = "10px";
    theResults.style.backgroundColor = "white";
    theResults.style.marginTop = "10px";
  }
}

// count down function
function countDown(duration, count) {
  if (currentIndex < count) {
    let minutes, secondes;
    countDownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      secondes = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      secondes = secondes < 10 ? `0${secondes}` : secondes;

      countDownEle.innerHTML = `${minutes} : ${secondes}`;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        submitBtn.click();
      }
    }, 1000);
  }
}
