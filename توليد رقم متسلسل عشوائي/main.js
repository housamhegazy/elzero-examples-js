let generate = document.querySelector(".generate");
let serialText = document.querySelector(".serial");

generate.onclick = function () {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let serial = "";
  let charsCount = 10
  for (let i = 0; i < charsCount; i++) {
    serial += chars[Math.floor(Math.random() * chars.length)];
  }
  serialText.innerHTML = serial;
};

