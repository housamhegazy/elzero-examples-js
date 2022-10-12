let input = document.querySelector("input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete-all");
let arrOfTasks = [];

if (localStorage.getItem("task")) {
  arrOfTasks = JSON.parse(localStorage.getItem("task"));
}
getTasksFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    tasks.innerHTML = "";
    addTasksToArray(input.value);
    //show the btn of delete all
    deleteAll.classList.add("show");
  }
  input.value = "";
};

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    //delete tasks from page
    e.target.parentElement.remove();
    //delete from local storage
    deleteFromLocalStorage(e.target.parentElement.dataset.id);
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.dataset.id);
    e.target.classList.toggle("done");
  }
});

deleteAll.onclick = function () {
  tasks.innerHTML = "";
  arrOfTasks = [];
  localStorage.removeItem("task");
};

function addTasksToArray(inputValue) {
  let task = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };
  arrOfTasks.push(task);
  addTasksToPage(arrOfTasks);
  addTasksToLocalStorage(arrOfTasks);
}
function addTasksToPage(arrOfTasks) {
    tasks.innerHTML = "";
    arrOfTasks.forEach(task => {
          let div = document.createElement("div");
          div.className = "task";
          if (task.completed) {
            div.className = "task done";
          }
          div.setAttribute("data-id", task.id);
          div.appendChild(document.createTextNode(task.title));
          let delBtn = document.createElement("span");
          delBtn.appendChild(document.createTextNode("delete"));
          delBtn.className = "del";
          div.appendChild(delBtn);
          tasks.appendChild(div);
    });
}

function addTasksToLocalStorage(arrOfTasks) {
  window.localStorage.setItem("task", JSON.stringify(arrOfTasks));
}

function getTasksFromLocalStorage() {
  let data = JSON.parse(localStorage.getItem("task"));
  if (data) {
    let tasks = data;
    addTasksToPage(tasks);
  }
}

function deleteFromLocalStorage(taskId) {
  arrOfTasks = arrOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrOfTasks);
}

function toggleStatusTaskWith(id) {
  for (i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].id == id) {
      arrOfTasks[i].completed == false
        ? (arrOfTasks[i].completed = true)
        : (arrOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrOfTasks);
}
