//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addtodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addtodo(event) {
    //запрещает отправлять форму(перезагрузку)
    event.preventDefault();

    //div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //li
    const newtodo = document.createElement('li');
    newtodo.innerText = todoInput.value;
    newtodo.classList.add('todo-item');//добавляет классы для элемента
    todoDiv.appendChild(newtodo);//добавляет новый элемент в конец списка

    saveLocalTodos(todoInput.value);

    //check button
    const complitedButton = document.createElement('button');
    complitedButton.innerHTML = '<i class="fas fa-check"></i>';
    complitedButton.classList.add("complete-button");
    todoDiv.appendChild(complitedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";

}

function deleteCheck(event) {
    const item = event.target;
    //delete todo
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        deleteLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();//выполняется, когда анимация завершится
        })
    }
    //check todo
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
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
            case "active":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    })
}

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

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');
        todoDiv.appendChild(newtodo);

        const complitedButton = document.createElement('button');
        complitedButton.innerHTML = '<i class="fas fa-check"></i>';
        complitedButton.classList.add("complete-button");
        todoDiv.appendChild(complitedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

function deleteLocalTodos(todo) {
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