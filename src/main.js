import { nanoid } from 'nanoid';

import refs from './js/refs';
import localStorageApi from './js/local-storage-api';
import { createMarkupTask, createMarkupList } from './js/markup-tasks';
import { renderTasks } from './js/render-tasks';
/*
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

let arrTasks = localStorageApi.getTasks();
// let arrTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

renderTasks(createMarkupList(arrTasks));

refs.formEl.addEventListener('submit', onFormSubmit);
refs.taskListEl.addEventListener('click', deleteTask);

function onFormSubmit(event) {
  event.preventDefault();

  const taskName = event.currentTarget.elements.taskName.value.trim();
  const taskDescription =
    event.currentTarget.elements.taskDescription.value.trim();

  const newTask = {
    taskName,
    taskDescription,
    id: nanoid(),
  };

  arrTasks.push(newTask);
  localStorageApi.addTasks(arrTasks);

  const markup = createMarkupTask(newTask);
  renderTasks(markup);
}

function deleteTask(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const id = event.target.closest('[data-id]').dataset.id;
  arrTasks = arrTasks.filter(task => task.id !== id);
  localStorageApi.addTasks(arrTasks);
  refs.taskListEl.innerHTML = '';
  renderTasks(createMarkupList(arrTasks));

  console.log(arrTasks);
}
