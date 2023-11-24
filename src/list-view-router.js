const express = require("express");

const listViewRouter = express.Router();

listViewRouter.get("/completed", (req, res) => {
    // Filtra las tareas completadas del array global.tasks
    const completedTasks = global.tasks.filter(task => task.isCompleted);
  
    res.json(completedTasks);
  });

  listViewRouter.get("/incomplete", (req, res) => {
    // Filtra las tareas incompletas del array global.tasks
    const incompleteTasks = global.tasks.filter(task => !task.isCompleted);
  
    res.json(incompleteTasks);
  });

listViewRouter.use((req, res) => {
    res.status(404).send("No se ha encontrado la página");
});

module.exports = listViewRouter;