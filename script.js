// ===== COLUMN REFERENCES =====
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const completed = document.querySelector('#completed');

// store columns in array for easy looping
const columns = [todo, progress, completed];

// object to store tasks for localStorage
let tasksData = {
    todo: [],
    progress: [],
    completed: []
};

// variable to track dragged task
let draggedElement = null;


// ===== CREATE TASK FUNCTION + DELETE EVENT =====
function addTask(title, desc, column){

    // create task container
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('draggable', 'true');

    // task content
    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `;

    // append task to column
    column.appendChild(div);

    // drag start event
    div.addEventListener('dragstart', () => {
        draggedElement = div;
    });

    // delete task event
    div.querySelector('button').addEventListener('click', () => {
        div.remove();
        updateTaskCount();
    });

    return div;
}


// ===== UPDATE TASK COUNT + LOCAL STORAGE =====
function updateTaskCount(){

    columns.forEach(col => {

        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right h4');

        // update column count
        count.innerText = tasks.length;

        // update local storage data
        tasksData[col.id] = Array.from(tasks).map(task => {
            return {
                title: task.querySelector('h2').innerText,
                desc: task.querySelector('p').innerText
            }
        });
    });

    // save tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasksData));
}


// ===== LOAD TASKS FROM LOCAL STORAGE =====
if(localStorage.getItem('tasks')){

    const data = JSON.parse(localStorage.getItem('tasks'));

    for(const col in data){

        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            addTask(task.title, task.desc, column);
        });
    }

    updateTaskCount();
}


// ===== DRAG & DROP EVENTS FOR COLUMNS =====
function addDragEventsOnColumn(column){

    // when dragged item enters column
    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add('hover-over');
    });

    // when dragged item leaves column
    column.addEventListener('dragleave', () => {
        column.classList.remove('hover-over');
    });

    // allow dropping
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // drop task inside column
    column.addEventListener('drop', (e) => {

        e.preventDefault();

        column.appendChild(draggedElement);
        column.classList.remove('hover-over');

        updateTaskCount();
    });
}


// apply drag events to all columns
columns.forEach(col => addDragEventsOnColumn(col));


// ===== MODAL CONTROLS =====
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const addBtn = document.getElementById('add');
const modalBg = document.querySelector('.modal-overlay');


// open modal
addBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

// close modal button
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// close modal on background click
modalBg.addEventListener('click', () => {
    modal.classList.remove('active');
});


// ===== ADD TASK FROM MODAL =====
const addTaskBtn = document.getElementById('add-task-btn');

addTaskBtn.addEventListener('click', () => {

    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');

    const taskTitle = taskTitleInput.value.trim();
    const taskDesc = taskDescInput.value.trim();

    // validation
    if(taskTitle === '' || taskDesc === ''){
        alert('Please fill in all fields');
        return;
    }

    // add task to TODO column
    addTask(taskTitle, taskDesc, todo);

    // update storage + counts
    updateTaskCount();

    // clear input fields
    taskTitleInput.value = '';
    taskDescInput.value = '';

    // close modal
    modal.classList.remove('active');
});