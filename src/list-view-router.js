const express = require("express");

const router = express.Router();

router.get("/completed", (req, res) => {
    res.send("lista de tareas completas");
});

router.get("/ongoing", (req, res) => {
    res.send("lista de tareas incompletas");
});

router.use((req, res) => {
    res.status(404).send("página no encontrada");
});

module.exports = router;