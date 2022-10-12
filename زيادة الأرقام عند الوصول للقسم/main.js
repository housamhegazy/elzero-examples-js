// let section = document.querySelector(".three");
// let nums = document.querySelectorAll(".num");
// let started = false;



// window.onscroll = function(){
//     if(window.scrollY >= section.offsetTop){
//        if(!started){
//          nums.forEach((num) => startCount(num));
//        }
//        started = true
//     }
// }

// function startCount(ele){
//     let goal = ele.dataset.goal;
//     let increase = 2000/goal
//     let count = setInterval(() => {
//       ele.textContent++;
//       if (ele.textContent === goal) {
//         clearInterval(count);
//       }
//     }, increase);
// }

let section = document.querySelector(".three");
let nums = document.querySelectorAll(".num");
let started = false
window.onscroll = function (){
    if(window.scrollY >= section.offsetTop){
        if(!started){
            nums.forEach((num) => startCount(num));
        }
        started =true
    }
}

function startCount(ele){
    let goal = ele.dataset.goal
    let setTime = setInterval(()=>{
        ele.textContent++
        if(ele.textContent === goal){
            clearInterval(setTime)
        }
    },2000/goal)
}