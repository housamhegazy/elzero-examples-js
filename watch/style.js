let count = setInterval(() => {
  let hoursEl = document.querySelector("#hour");
  let minuteEl = document.querySelector("#minute");
  let seconedEl = document.querySelector("#seconed");
  let d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let secondes = d.getSeconds();
  hoursEl.innerHTML = hours < 10 ? `0${hours}` : hours;
  minuteEl.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  seconedEl.innerHTML = secondes < 10 ? `0${secondes}` : secondes;

  let dateEle = document.querySelector("#date");
  let date = d.getDate();
  if (date >= 0 && date <= 9) {
    date = "0" + date;
  }
  let month = d.getMonth() + 1;
  if (month >= 0 && month <= 9) {
    month = "0" + month;
  }
  let year = d.getFullYear();
  if (year >= 0 && year <= 9) {
    year = "0" + year;
  }
  dateEle.innerHTML = date + "/" + month + "/" + year;

  //day
  let dayEle = document.querySelector("#day");
  let dayNumber = d.getDay();
  let dayName = "";
  switch (dayNumber) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
  }
  dayEle.innerHTML = dayName;
}, 1000);
