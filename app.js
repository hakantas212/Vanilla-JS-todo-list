//Define UI
const form = document.querySelector("#task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener("submit", AddTask);
    //remove task eventListener
    taskList.addEventListener("click", removeTask);
    //clear task event
    clearBtn.addEventListener("click", clearTasks);
    //filter task event
    filter.addEventListener("keyup", filterTasks);
}

//get tasks from localstorage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task){
      //create li element
      const li = document.createElement('li');
      //add class
      li.className = 'collection-item';
      //create text node and append to li
      li.appendChild(document.createTextNode(task));
      //create new link element
      const link = document.createElement('a');
      //add class
      link.className = 'delete-item secondary-content';
      //add icon html
      link.innerHTML = '<i class="fa fa-trash-o"></i>';
      //append the link to li
      li.appendChild(link);
  
      //append li to ul
      taskList.appendChild(li);
    });
  }

//add task
function AddTask(e) {
    if(taskInput.value === ""){
        alert("add a task");
        return false;
    }
    
    //create li element
    const li = document.createElement("li");
    //class
    li.className = "collection-item";
    //create textnode
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element and append to li item
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-trash-o" fa-10x></i>';
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = "";

    e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains("delete-item")) {
        e.target.parentElement.parentElement.remove();
    
    //remove from localstorage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}
//remove from localstorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);

        //localstorage
        clearTasksFromLocalStorage();
    }
}

//clear tasks from localstorsge
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        });
}

