// app.js

const express = require('express');
const bodyParser = require('body-parser');
const readline = require('readline');
const listViewRouter = require('./src/list-view-router');

const app = express();
const PORT = process.env.PORT || 3000;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Lista de tareas (debe estar vacía al inicio)
let tasks = [];

// Middleware para convertir el cuerpo de la solicitud a JSON
app.use(bodyParser.json());

// Middleware para asignar req.tasks antes de llegar a listViewRouter
app.use((req, res, next) => {
    req.tasks = tasks;
    next();
});

// Implementa ambos routers en el servidor principal
app.use('/list-view', listViewRouter);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
