const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const completed = document.querySelector('#completed');

const taskColumn = document.querySelectorAll('.task-column');

const tasks = document.querySelectorAll('.task');

let draggedElement = null;

tasks.forEach(task => {
    task.addEventListener('dragstart', (e) => {
        draggedElement = task;
    }) 
})

function addDragEventsOnColumn(column){

    column.addEventListener('dragenter', (e) => {
        e.preventDefault()
        column.classList.add('hover-over');
    })

    column.addEventListener('dragleave', (e) => {
        e.preventDefault();
        column.classList.remove('hover-over');
    })

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.appendChild(draggedElement);
        column.classList.remove('hover-over');
    })
} 

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(completed);

const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const addBtn = document.getElementById('add');
const modalBg = document.querySelector('.bg');

addBtn.addEventListener('click', () => {
    modal.classList.add('active');
})

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
})

modalBg.addEventListener('click', () => {
    modal.classList.remove('active');
})