const todoInput = document.querySelector(".input");
const todo = document.querySelector(".todo_list");
const useDate = document.querySelector(".title_content");

// 날짜 받아오기
let today = new Date();
let year = String(today.getFullYear());
let month = String(today.getMonth() + 1);
let date = String(today.getDate());

const todayDate = document.createElement("p");
todayDate.classList.add("date");
todayDate.textContent = "<" + year + "/" + month + "/" + date + ">";

useDate.appendChild(todayDate);

// 기존에 저장된 todoList 받아오기
function getTodoList() {
  const todos = JSON.parse(localStorage.getItem("todo") ?? "[]");

  for (let i = 0; i < todos.length; i++) {
    const todoValue = todos[i];

    const newLi = document.createElement("li");
    newLi.classList.add("todo_item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("click", () => {
      todoList.classList.toggle("checked");
      checkbox.classList.toggle("checked");
    });

    const todoList = document.createElement("div");
    todoList.classList.add("list_item");

    const newBtn = document.createElement("button");
    newBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    newBtn.classList.add("newBtn");

    newBtn.addEventListener("click", deleteTodo);

    todoList.textContent = todoValue;

    newLi.appendChild(checkbox);
    newLi.appendChild(todoList);
    newLi.appendChild(newBtn);
    todo.appendChild(newLi);
  }
}
getTodoList();

// todo 추가하기
const todoForm = document.querySelector(".todo_form");
todoForm.addEventListener("submit", submitTodoForm);

function submitTodoForm(event) {
  event.preventDefault();
  addTodo();
}

function addTodo() {
  const newLi = document.createElement("li");
  newLi.classList.add("todo_item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("click", () => {
    todoList.classList.toggle("checked");
    checkbox.classList.toggle("checked");
  });

  const todoList = document.createElement("div");
  todoList.classList.add("list_item");

  const newBtn = document.createElement("button");
  newBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  newBtn.classList.add("newBtn");

  newBtn.addEventListener("click", deleteTodo);

  if (todoInput.value.trim() === "") {
    alert("할 일을 입력하세요.");
    return;
  } else {
    todoList.textContent = todoInput.value;
  }

  newLi.appendChild(checkbox);
  newLi.appendChild(todoList);
  newLi.appendChild(newBtn);
  todo.appendChild(newLi);

  const prevTodos = JSON.parse(localStorage.getItem("todo") ?? "[]");
  localStorage.setItem("todo", JSON.stringify([...prevTodos, todoInput.value]));

  todoInput.value = "";
}

// todo 삭제하기
function deleteTodo(event) {
  const todoElem = event.target.closest("li");

  if (!todoElem) {
    alert("해당 Todo는 존재하지 않습니다.");
    return;
  }

  const prevTodos = JSON.parse(localStorage.getItem("todo") ?? "[]");
  const newTodos = prevTodos.filter((value) => todoElem.textContent !== value);
  localStorage.setItem("todo", JSON.stringify(newTodos));

  todoElem.remove();
}
