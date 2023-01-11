
//DOM  
const todoInput = document.querySelector(".todo-input");
const todoInputDesc = document.querySelector(".todo-input-desc");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const infoButton = document.querySelector(".info-but")
/* const shareButton = document.querySelector(".share-but")
const editButton = document.querySelector(".edit-but")
const sortButton = document.querySelector(".sort-but")
const deleteAllButton = document.querySelector(".delall-but")
 */



//Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
infoButton.addEventListener("click", showInfo)
/* filterOption.addEventListener("click", filterTodo); */




//Functions


function showInfo (e) {
  e.preventDefault();
  console.log('asd')
}


function addTodo(e) {
  e.preventDefault();
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  // create description 
  const newTodoDesc = document.createElement("li");
  newTodoDesc.innerText = todoInputDesc.value;

  //Save items to local
  saveLocalTodos(todoInput.value);
  saveLocalTodos(todoInputDesc.value);
  //
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  //
  newTodoDesc.classList.add("todo-item-desc")
  todoDiv.appendChild(newTodoDesc)
  todoInputDesc.value = ""

  //Create status Button
  const statusButton = document.createElement("button")
  statusButton.innerHTML= `<img src="/src/icons/check-circle-notok.png"/>`
  statusButton.classList.add('button-status')
  todoDiv.insertBefore(statusButton, newTodo)

  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<img src="/src/icons/edit-icon.png"/>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<img src="/src/icons/trash.png"/>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);
    // create line
  const underLine = document.createElement('div')
  underLine.classList.add('todo-underline')
  todoDiv.appendChild(underLine)
  
}

function deleteTodo(e) {
  const item = e.target;
  console.log(item) //////////////////////////////////!!!

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
  if (item.classList[0] === "button-status" && "todo") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}





/* function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
} */

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create status Button
    const statusButton = document.createElement("button")
    statusButton.innerHTML= `<img src="/src/icons/check-circle-notok.png"/>`
    statusButton.classList.add('button-status')
    todoDiv.insertBefore(statusButton, newTodo)
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<img src="/src/icons/edit-icon.png"/>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<img src="/src/icons/trash.png"/>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}