const express = require("express");

const listViewRouter = express.Router();

listViewRouter.get("/completed", (req, res) => {
    res.send("Lista de tareas completadas");
});

listViewRouter.get("/incomplete", (req, res) => {
    res.send("lista de tareas no completadas");
});

listViewRouter.use((req, res) => {
    res.status(404).send("No se ha encontrado la página");
});

module.exports = listViewRouter;