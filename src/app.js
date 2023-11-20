const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
const PORT = process.env.PORT || 3000;

// Lista de tareas (debería obtenerse desde una base de datos)
global.tasks = [];

app.use(bodyParser.json());

// Pasa la variable tasks como middleware a los routers
app.use('/list-view', (req, res, next) => {
  req.tasks = tasks;
  next();
}, listViewRouter);

app.use('/list-edit', (req, res, next) => {
  req.tasks = tasks;
  next();
}, listEditRouter);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});