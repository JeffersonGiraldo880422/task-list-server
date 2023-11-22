const express = require("express");
const port = 3000;

const app = express();
const listEditRouter = require("./list-edit-router");
const listViewRouter = require("./list-view-router");
const TaskList = [
    {
        "id":"123456",
        "isCompleted":false,
        "description":"Walk the dog",
    },
]

app.use("/edit", listEditRouter);
app.use("/view", listViewRouter);
app.use((req, res, next) => {
    const method = req.method;
    const methods = ["POST", "PUT", "DELETE", "GET"]
    
    methods.includes(method) ? next() : res.status(400).send("Método inválido");
})



app.get("/", (req, res) => {
    res.send(JSON.stringify(TaskList));
})

app.listen(port, (error) => {
    error ? console.log(error) : console.log("server listening...");
})