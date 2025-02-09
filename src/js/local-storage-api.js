const STORAGE_KEY = 'tasks';

const getTasks = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const addTasks = data => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default {
  getTasks,
  addTasks,
};
