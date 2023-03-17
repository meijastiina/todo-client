// Get UI elements
const list = document.getElementById("todoList");
const input = document.getElementById("newTask");
// Const URI for backend
const BACKEND_ROOT_URL = 'http://localhost:3001';
// import Todos.ts
import { Todos } from './class/Todos.js';
// Create todos object
const todos = new Todos(BACKEND_ROOT_URL);
// disable input
input.disabled = true;
// Fetch from backend
todos.getTasks().then((tasks) => {
    tasks.forEach(task => {
        renderTask(task);
    });
    input.disabled = false;
}).catch(error => {
    alert(error);
});
// Create eventlistener for input's keypress
input.addEventListener('keypress', event => {
    // If enter is pressed
    if (event.key === "Enter") {
        // Prevent form action
        event.preventDefault();
        // Get text from input
        const newTaskName = input.value.trim();
        // IF not empty
        if (newTaskName.length > 0) {
            todos.addTask(newTaskName).then((task) => {
                // Reset input value
                input.value = '';
                input.focus();
                renderTask(task);
            });
        }
    }
});
// renderTask function
const renderTask = (task) => {
    // Create a new li item
    const listItem = document.createElement('li');
    // Set class
    listItem.setAttribute('class', 'list-group-item');
    // Render span and link
    renderSpan(listItem, task.description);
    renderLink(listItem, task.id);
    // Add list item into ul
    list.append(listItem);
};
// renderSpan function
const renderSpan = (listItem, description) => {
    const span = listItem.appendChild(document.createElement('span'));
    span.innerHTML = description;
};
// renderLink function
const renderLink = (listItem, id) => {
    const link = listItem.appendChild(document.createElement('a'));
    link.setAttribute('href', '#');
    link.setAttribute('style', 'float: right');
    link.setAttribute('data-id', id.toString());
    link.innerHTML = '<i class="bi bi-trash"></i>';
    link.addEventListener('click', event => {
        event.preventDefault();
        const elementToRemove = document.querySelectorAll('[data-id="' + id + '"]')[0].parentElement;
        todos.removeTask(id).then((id) => {
            list.removeChild(elementToRemove);
        }).catch(error => {
            alert(error);
        });
    });
};
