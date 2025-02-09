import refs from './refs';

export function renderTasks(markup) {
  refs.taskListEl.insertAdjacentHTML('beforeend', markup);
}
