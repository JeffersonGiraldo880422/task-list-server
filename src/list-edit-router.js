// list-edit-router.js
const express = require('express');
const listEditRouter = express.Router();

const express = require("express");

const router = express.Router();

const errorValidation = (req, res, next) => {
  const method = req.method;
  const body = req.body;

  if (method === "POST"){
    !Object.keys(req.body).length ? res.status(400).send("No se recibieron datos") : body.description ? next() : res.status(400).send("Los datos están incompletos");
  } else if (method === "PUT") {
    body ? body.description ? next() : res.status(400).send("Los datos están incompletos") : res.status(400).send("No se recibieron datos");
  }
};

router.use(express.json());

router.get("/", (req, res) => {
  res.send("hola")
});

router.put("/:id", errorValidation, (req, res) => {
  const id = req.params.id;
  res.send(`Se actualizará la tarea con ID No. ${id}`);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Se eliminará la tarea con ID No. ${id}`);
});

router.post("/", errorValidation, (req, res) => {
  res.send("se recibe en el body la nueva tarea");
});

module.exports = router;