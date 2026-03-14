const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const completed = document.querySelector('#completed');

const addBtn = document.getElementById('add');
const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener('drag', (e) => {
        console.log('dragging', e)
    }) 
})