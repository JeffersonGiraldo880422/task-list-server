const express = require("express");
const listEditRouter = express.Router();

const errorValidation = (req, res, next) => {
  const method = req.method;
  const body = req.body;

  if (method === "POST") {
    !Object.keys(req.body).length ? 
      res.status(400).send("No se han recibido datos") : 
      body && body.description ? 
        next() : 
        res.status(400).send("Faltan datos, por favor completar");
  } else if (method === "PUT") {
    body ? 
      body.description ? 
        next() : 
        res.status(400).send("Faltan datos, por favor completar") : 
      res.status(400).send("No se han recibido datos");
  }
};

listEditRouter.use(express.json());

listEditRouter.get("/", (req, res) => {
  res.send("El router de edición está funcionando");
});

listEditRouter.post("/create", errorValidation, (req, res) => {
  const newTask = req.body;
  global.tasks.push(newTask); // Agrega la nueva tarea a la lista global
  res.json(global.tasks);
});

listEditRouter.put('/update/:taskId', errorValidation, (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;

  // Encuentra la tarea con el ID correspondiente
  const taskToUpdate = global.tasks.find(task => task.id === parseInt(taskId));

  if (!taskToUpdate) {
    return res.status(404).send("Tarea no encontrada");
  }

  // Actualiza la información de la tarea
  Object.assign(taskToUpdate, updatedTask);

  res.json(global.tasks);
});


listEditRouter.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  
  // Encuentra el índice de la tarea con el ID correspondiente
  const taskIndex = global.tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).send("Tarea no encontrada");
  }

  // Elimina la tarea específica del array global.tasks
  global.tasks.splice(taskIndex, 1);

  res.json(global.tasks);
});

module.exports = listEditRouter;
