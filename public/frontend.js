document.getElementById('taskForm').addEventListener('submit', addTask);
document.getElementById('filterTasks').addEventListener('change', filterTasks);

function showMessage(message, type) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  setTimeout(() => {
    messageContainer.innerHTML = '';
  }, 3000);
}

async function addTask(event) {
  event.preventDefault();
  const title = document.getElementById('taskTitle').value.trim();

  // Check Title
  if (!title) {
    showMessage('Please insert a title for the task.', 'warning');
    return;
  }

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (!response.ok) throw new Error('Error adding task.');

    const task = await response.json();
    displayTask(task);
    document.getElementById('taskTitle').value = '';
    showMessage('Task created successfully!', 'success');
  } catch (error) {
    console.error('Error adding task:', error);
    showMessage('Error adding task. Please try again.', 'danger');
  }
}

function displayTask(task) {
  const taskList = document.getElementById('taskList');
  const taskItem = document.createElement('li');
  taskItem.className = 'list-group-item d-flex align-items-center'; // Adiciona classes para alinhamento
  taskItem.dataset.taskId = task._id;

  // Checkbox for completed
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.className = 'me-2'; // Adiciona espaçamento à direita
  checkbox.addEventListener('change', () => toggleComplete(task._id, checkbox.checked));

  const taskTitle = document.createElement('span');
  taskTitle.textContent = task.title;
  taskTitle.style.textDecoration = task.completed ? 'line-through' : 'none';

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Excluir';
  deleteButton.className = 'btn btn-danger btn-sm ms-auto'; 
  deleteButton.addEventListener('click', () => deleteTask(task._id, taskItem));

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTitle);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

// Function Toggle Task Status
async function toggleComplete(taskId, completed) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });

    if (!response.ok) throw new Error('Error updating task');

    const taskItem = document.querySelector(`[data-task-id="${taskId}"] span`);
    taskItem.style.textDecoration = completed ? 'line-through' : 'none';
  } catch (error) {
    console.error('Error updating task:', error);
    showMessage('Error updating task. Please try again.', 'danger');
  }
}

// Function Delete Tasks
async function deleteTask(taskId, taskItem) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Error deleting task.');

    taskItem.remove();
  } catch (error) {
    console.error('Error deleting task:', error);
    showMessage('Error deleting the task. Please try again.', 'danger');
  }
}

// Function load tasks on screen
async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Error loading tasks.');

    const tasks = await response.json();
    document.getElementById('taskList').innerHTML = '';
    tasks.forEach(displayTask);
  } catch (error) {
    console.error('Error loading tasks:', error);
    showMessage('Error loading tasks. Please try again.', 'danger');
  }
}

// Filter Tasks
function filterTasks() {
  const filterValue = document.getElementById('filterTasks').value;
  const tasks = document.querySelectorAll('#taskList li');

  tasks.forEach(taskItem => {
    const isCompleted = taskItem.querySelector('input[type="checkbox"]').checked;
    if (
      filterValue === 'all' ||
      (filterValue === 'completed' && isCompleted) ||
      (filterValue === 'incomplete' && !isCompleted)
    ) {
      taskItem.style.display = '';
    } else {
      taskItem.style.display = 'none';
    }
  });
}
function toggleForms() {
  document.getElementById('loginForm').style.display = 
    document.getElementById('loginForm').style.display === 'none' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = 
    document.getElementById('registerForm').style.display === 'none' ? 'block' : 'none';
}

function showMessage(message, type) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  setTimeout(() => {
    messageContainer.innerHTML = '';
  }, 3000);
}

// Register New User
async function register() {
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (response.ok) {
      showMessage('User registered successfully!', 'success');
      toggleForms();
    } else {
      showMessage(result.error || 'Error registering. Please try again.', 'danger');
    }
  } catch (error) {
    showMessage('Error registering. Please try again.', 'danger');
  }
}

// Login Function
async function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    // Verify response before login
    if (response.status === 401) {
      showMessage('Invalid credentials. Please try again.', 'danger');
      return;
    }

    if (!response.ok) {
      showMessage('Error logging in. Please try again.', 'danger');
      return;
    }

    // Loged
    const result = await response.json();
    showMessage('Login successfully!', 'success');

    // Show Task Manager
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('taskManager').style.display = 'block';
    loadTasks(); 

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    showMessage('Error logging in. Please try again.', 'danger');
  }
}

async function logout() {
  try {
    const response = await fetch('/auth/logout', { method: 'POST' });
    if (response.ok) {
      showMessage('Deslogado com sucesso.', 'success');
      document.getElementById('taskManager').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
    } else {
      showMessage('Error logging out. Please try again.', 'danger');
    }
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    showMessage('Error logging out. Please try again.', 'danger');
  }
}

loadTasks();
