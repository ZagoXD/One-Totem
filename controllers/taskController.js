const Task = require('../models/Task');

// Create New Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      completed: false,
      userId: req.userId // get userID by middleware
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar a tarefa' });
  }
};

// Get user tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar tarefas' });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar a tarefa' });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa deletada' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar a tarefa' });
  }
};
