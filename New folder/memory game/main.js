let blocksContainer = document.querySelector(".game-blocks");
let tries = document.querySelector(".tries span");

document.querySelector(".overlay button").onclick = function () {
  let alert = prompt("what is your name ? ");
  let nameEle = document.querySelector(".name span");
  if (alert === null || alert === "") {
    nameEle.textContent = "unknown";
  } else {
    nameEle.textContent = alert;
  }
  document.querySelector(".overlay").classList.add("hidd");
};

let duration = 1000;
let blocks = Array.from(document.querySelectorAll(".game-blocks .block"));
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.addEventListener("click", () => {
    //flip block function
    flipBlock(block);
  });
  block.style.order = orderRange[index];
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flipped");
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped")
  );
  if (allFlippedBlocks.length === 2) {
    disablePointer();
    checkEqualFlipped(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
  // final success function
  finalFinish();
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function disablePointer() {
  blocksContainer.classList.add("disable");
  setTimeout(() => {
    blocksContainer.classList.remove("disable");
  }, duration);
}

function checkEqualFlipped(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("stayFlipped");
    secondBlock.classList.add("stayFlipped");
    document.querySelector("#success").play();
  } else {
    firstBlock.classList.add("flipped");
    secondBlock.classList.add("flipped");
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    document.querySelector("#fail").play();
  }
}

function finalFinish() {
  // final success
  let sucessEle = Array.from(document.querySelectorAll(".stayFlipped"));
  if (sucessEle.length === blocks.length) {
    blocks.forEach((block) => {
      block.classList.remove("stayFlipped");
    });
    document.querySelector(".overlay").classList.remove("hidd");
    tries.innerHTML = 0;
  }
}
