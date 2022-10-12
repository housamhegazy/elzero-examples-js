let test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

let arr = [];

for (i = 0; i < 6; i++) {
  let randomNumber = Math.floor(Math.random() * test.length);
  let hexColor = test[randomNumber];
  arr.push(hexColor);
}
const randomColor = `#${arr.join("")}`;
document.querySelector(".container").style.backgroundColor = randomColor;
