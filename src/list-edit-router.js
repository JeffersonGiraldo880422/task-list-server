// list-edit-router.js
const express = require('express');
const listEditRouter = express.Router();

// Hacer una solicitud POST a una ruta específica para crear una tarea
listEditRouter.post('/create', (req, res) => {
  const newTask = req.body;
  req.tasks.push(newTask); // Agrega la nueva tarea a la lista global
  res.json(req.tasks);
});

// Hacer una solicitud DELETE a una ruta específica para eliminar una tarea
listEditRouter.delete('/delete/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  req.tasks = req.tasks.filter(task => task.id !== parseInt(taskId)); // Elimina la tarea con el ID proporcionado
  res.json(req.tasks);
  tasks=req.tasks;
});

// Hacer una solicitud UPDATE a una ruta específica para actualizar una tarea
listEditRouter.put('/update/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  req.tasks = req.tasks.map(task => (task.id === parseInt(taskId) ? updatedTask : task)); // Actualiza la tarea con el ID proporcionado
  res.json(req.tasks);
  tasks=req.tasks;
});

module.exports = listEditRouter;
