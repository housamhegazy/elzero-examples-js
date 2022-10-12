
let expireDate = new Date(2025, 7, 11, 18, 27, 55).getTime();
let allEle = document.querySelectorAll("span");
// let count = parseInt(ele.textContent);

let setTime = setInterval(() => {
    let date = new Date().getTime();
    let duration = expireDate - date;
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((duration % (1000 * 60)) / 1000);
    // create element
    let daysEle = document.querySelector(".days");
    let hoursEle = document.querySelector(".hours");
    let minutesEle = document.querySelector(".minutes");
    let secondsEle = document.querySelector(".seconds");
    daysEle.textContent = days < 10? `0${days}` : days
    hoursEle.textContent = hours < 10 ? `0${hours}` : hours;
    minutesEle.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsEle.textContent = seconds < 10 ? `0${seconds}` : seconds;
    if(duration < 1){
        clearInterval(setTime);
        console.log("finished")
        daysEle.remove();
        hoursEle.remove();
        minutesEle.remove();
        secondsEle.remove()
    }
}, 1000);

