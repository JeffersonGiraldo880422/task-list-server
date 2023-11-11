// list-view-router.js

const express = require('express');
const listViewRouter = express.Router();

// Hacer una solicitud GET a una ruta específica para listar las tareas completas
listViewRouter.get('/completed', (req, res) => {
    // Asegúrate de que req.tasks esté definido y es un array antes de filtrar
    const completedTasks = Array.isArray(req.tasks) ? req.tasks.filter(task => task.completed) : [];
    res.json(completedTasks);
});

// Hacer una solicitud GET a una ruta específica para listar las tareas incompletas
listViewRouter.get('/incomplete', (req, res) => {
    // Asegúrate de que req.tasks esté definido y es un array antes de filtrar
    const incompleteTasks = Array.isArray(req.tasks) ? req.tasks.filter(task => !task.completed) : [];
    res.json(incompleteTasks);
});

module.exports = listViewRouter;
