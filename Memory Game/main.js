document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("what is your name?");

  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blockContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockContainer.children);
// make random number of array
let orderRange = Array.from(Array(blocks.length).keys());

//add order property to game blocks
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  //add click event
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

//flip block function
function flipBlock(selectedBlock) {
  //add class to flipped
  selectedBlock.classList.add("is-flipped");
  //collect all flip card
  let allFlippedBlocks = blocks.filter((flippedBlocks) =>
    flippedBlocks.classList.contains("is-flipped")
  );
  //if there two selected blocks
  if (allFlippedBlocks.length === 2) {
    // console.log("two flipped");
    //stop clicking function
    stopClicking();
    //check matched block function
    checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
  }
}


//shuffle function
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    //1-save current element in stash
    temp = array[current];
    //2- current element = random element
    array[current] = array[random];
    //3- random element = get element from stash
    array[random] = temp;
  }
  return array;
}

// stopClicking fuction
function stopClicking() {
  //add class no clicking on main container
  blockContainer.classList.add("no-clicking");
  setTimeout(() => {
    //remove class no clicking
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

//check matched blocks
function checkMatchedBlocks(firstBlock,secondBlock){
  let triesElement = document.querySelector(".tries span");
  if(firstBlock.dataset.technology === secondBlock.dataset.technology){
    firstBlock.classList.remove("is-flipped")
    secondBlock.classList.remove("is-flipped")

    firstBlock.classList.add("has-match")
    secondBlock.classList.add("has-match")
    document.querySelector("#success").play();
  }else{
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(()=>{
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    },duration)
    document.querySelector("#fail").play();
  }
}
