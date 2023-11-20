// list-view-router.js
const express = require('express');
const listViewRouter = express.Router();

// Hacer una solicitud GET a una ruta específica para listar las tareas completas
listViewRouter.get('/completed', (req, res) => {
  const completedTasks = req.tasks.filter(tasks => tasks.completed);
  res.json(completedTasks);
});

// Hacer una solicitud GET a una ruta específica para listar las tareas incompletas
listViewRouter.get('/incomplete', (req, res) => {
  const incompleteTasks = req.tasks.filter(tasks => !tasks.completed);
  res.json(incompleteTasks);
});

module.exports = listViewRouter;

