const express = require('express');
const listEditRouter = express.Router();

// Hacer una solicitud POST a una ruta específica para crear una tarea
listEditRouter.post('/create', (req, res) => {
    const newTask = req.body;

    // Verifica si req.tasks es un array antes de intentar push
    req.tasks = Array.isArray(req.tasks) ? req.tasks : [];
    req.tasks.push(newTask);

    res.json(req.tasks);
});

// Hacer una solicitud DELETE a una ruta específica para eliminar una tarea
listEditRouter.delete('/delete/:taskId', (req, res) => {
    const taskId = req.params.taskId;

    // Verifica si req.tasks es un array antes de realizar operaciones
    req.tasks = Array.isArray(req.tasks) ? req.tasks.filter(task => task.indicator !== taskId) : [];

    res.json(req.tasks);
});

// Hacer una solicitud UPDATE a una ruta específica para actualizar una tarea
listEditRouter.put('/update/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body;

    // Verifica si req.tasks es un array antes de realizar operaciones
    req.tasks = Array.isArray(req.tasks) ? req.tasks.map(task => (task.indicator === taskId ? updatedTask : task)) : [];

    res.json(req.tasks);
});

module.exports = listEditRouter;
