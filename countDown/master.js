let countDownDate = new Date("DEc 31,2022").getTime();
// import number of millisecond's from 1971 to last day in 2022
console.log(countDownDate);

let counter = setInterval(() => {
  // get date now
  let dateNow = new Date().getTime();
  // find the Date difference between date now and count down date
  let dateDiff = countDownDate - dateNow;
  //   let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;

  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;

  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  document.querySelector(".min").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
  document.querySelector(".sec").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;
}, 1000);
