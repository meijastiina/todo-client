// Get UI elements
const list = document.getElementById("todoList");
const input = document.getElementById("newTask");
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
            // Create a new li item
            const listItem = document.createElement('li');
            // Set class
            listItem.setAttribute('class', 'list-group-item');
            // Add innterHMTL
            listItem.innerHTML = newTaskName;
            // Add list item into ul
            list.append(listItem);
            // Reset input value
            input.value = '';
        }
    }
});
