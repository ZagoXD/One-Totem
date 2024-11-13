document.getElementById('taskForm').addEventListener('submit', addTask);


// Function Create New Task
async function addTask(event) {
  event.preventDefault();
  const title = document.getElementById('taskTitle').value;

  // Post
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const task = await response.json();
    displayTask(task);
    document.getElementById('taskTitle').value = '';
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Show Tasks on Screen
function displayTask(task) {
  const taskList = document.getElementById('taskList');
  const taskItem = document.createElement('li');
  taskItem.className = 'list-group-item';
  taskItem.textContent = task.title;
  taskList.appendChild(taskItem);
}
