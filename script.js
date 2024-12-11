function generateUniqueId(){

    return '_' + Math.random().toString(36).substr(2,9); 

}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

function saveTask(task){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function addTask(task){
    var todoList = document.querySelector('.list');

    var newTodo = document.createElement('div');
    newTodo.className = 'list-content';
    newTodo.setAttribute('todo-id',task.id);
    newTodo.innerHTML = `
    <p>${task.text}</p>
    <button type="submit" id="done_button" class="done_button">Mark As Done</button>
    <button type="button" class="edit_button" id="edit_button">Edit</button>
    `
    todoList.appendChild(newTodo);
}

document.getElementById("button_submit").addEventListener('click',function(){
    const inputText = document.getElementById("input_text").value;

    if (inputText.trim() === ''){
        alert('Please enter some text before submitting!');
    }
    else{

        const taskObj = {
            id : generateUniqueId(),
            text : inputText
        };

        addTask(taskObj);
        saveTask(taskObj);
        document.getElementById("input_text").value = '';
    }

});


function removeTask(taskId){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updateTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks',JSON.stringify(updateTasks));
    console.log(text);
    console.log(localStorage.getItem('tasks'));
}

document.querySelector('.list').addEventListener('click', function (event) {
    // Check if the clicked element is a button with the 'done_button' class
    if (event.target && event.target.classList.contains('done_button')) {
        // Get the closest parent with class 'list-content'
        const listItem = event.target.closest('.list-content');
        // const text = listItem.querySelector('p').textContent;
        const taskId = listItem.getAttribute('todo-id');
        // Remove the list item
        listItem.remove();
        removeTask(taskId);
    }
});





// UPDATE TO-DO LIST LOGIC


// function updateTaskInLocalStorage(taskId, updatedText) {
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//     // Find the task and update its text
//     const updatedTasks = tasks.map(task => {
//         if (task.id === taskId) {
//             return { ...task, text: updatedText }; // Update text
//         }
//         return task;
//     });

//     // Save the updated tasks back to local storage
//     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
//     console.log("Updated tasks array:", updatedTasks);
// }


// document.querySelector('.list').addEventListener('click', function (event) {
//     if (event.target && event.target.classList.contains('edit_button')) {
//         const listItem = event.target.closest('.list-content');
//         const taskId = listItem.getAttribute('todo-id'); // Get the task ID
//         const taskTextElement = listItem.querySelector('p');
//         const oldText = taskTextElement.textContent;

//         // Replace the text with an input field
//         taskTextElement.innerHTML = `
//             <input type="text" class="edit_input" value="${oldText}">

//         `

//         // Change "Edit" button to "Save"
//         event.target.textContent = "Save";
//         event.target.classList.add('save_button');
//         event.target.classList.remove('edit_button');
//     }

//     if (event.target && event.target.classList.contains('save_button')) {
//         const listItem = event.target.closest('.list-content');
//         const taskId = listItem.getAttribute('todo-id');
//         const inputElement = listItem.querySelector('.edit_input');
//         const updatedText = inputElement.value.trim();

//         if (updatedText === '') {
//             alert('Task cannot be empty!');
//             return;
//         }

//         // Update the text in the DOM
//         listItem.querySelector('p').textContent = updatedText;

//         // Change "Save" button back to "Edit"
//         event.target.textContent = "Edit";
//         event.target.classList.add('edit_button');
//         event.target.classList.remove('save_button');

//         // Update the task in local storage
//         updateTaskInLocalStorage(taskId, updatedText);
//     }
// });


function updateTaskInLocalStorage(taskId, updatedText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update the task by its ID
    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, text: updatedText }; // Update the task's text
        }
        return task;
    });

    // Save the updated array back to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    console.log("Updated tasks array:", updatedTasks);
}



document.querySelector('.list').addEventListener('click', function (event) {
    // Check if the clicked element is the "Edit" button
    if (event.target && event.target.classList.contains('edit_button')) {
        const listItem = event.target.closest('.list-content'); // Find the parent div
        const taskId = listItem.getAttribute('todo-id'); // Get the task ID
        const taskTextElement = listItem.querySelector('p'); // Get the <p> element
        const oldText = taskTextElement.textContent; // Get the current task text

        // Replace <p> with an <input> field
        taskTextElement.innerHTML = `<input type="text" class="edit_input" value="${oldText}">`;

        // Change "Edit" button to "Save"
        event.target.textContent = "Save";
        event.target.classList.add('save_button');
        event.target.classList.remove('edit_button');
    }

    // Check if the clicked element is the "Save" button
    if (event.target && event.target.classList.contains('save_button')) {
        const listItem = event.target.closest('.list-content'); // Find the parent div
        const taskId = listItem.getAttribute('todo-id'); // Get the task ID
        const inputElement = listItem.querySelector('.edit_input'); // Get the input field
        const updatedText = inputElement.value.trim(); // Get the updated text

        if (updatedText === '') {
            alert('Task cannot be empty!');
            return;
        }

        // Replace the input field with the updated text
        listItem.querySelector('p').textContent = updatedText;

        // Change "Save" button back to "Edit"
        event.target.textContent = "Edit";
        event.target.classList.add('edit_button');
        event.target.classList.remove('save_button');

        // Update the task in local storage
        updateTaskInLocalStorage(taskId, updatedText);
    }
});






document.addEventListener('DOMContentLoaded',loadTasks);
