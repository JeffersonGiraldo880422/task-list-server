const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
const listEditRouter = require("./list-edit-router");
const listViewRouter = require("./list-view-router");

app.use(bodyParser.json());

global.tasks = global.tasks || [];

const usersDB = [
    {
        username: "user",
        password: "user123",
        roll: "user"
    },
    {
        username: "admin",
        password: "admin123",
        roll: "admin"
    }
]

app.use("/edit", listEditRouter);
app.use("/view", listViewRouter);
app.use(express.json());
app.use((req, res, next) => {
    const method = req.method;
    const methods = ["POST", "PUT", "DELETE", "GET"];
    
    methods.includes(method) ? next() : res.status(400).send("Método inválido");
})

const authVerification = (req, res, next) => {
    acessToken = req.headers["authorization"];
    if (!acessToken) res.status(403).send("No te has autenticado");

    jwt.verify(acessToken, process.env.SECRET_KEY, (err, user) => {
        err ? res.status(403).send("Acceso denegado") : next();
    });
};

app.get("/", (req, res) => {
    res.send(JSON.stringify(tasks));
})

app.get("/xfiles", authVerification, (req, res) => {
    res.status(200).send("Esta parte es exclusiva y privada");
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    const user = usersDB.find((user) => user.username == username && user.password == password);

    if(!user){
        res.status(401).send("Usuario o contraseña inválido");
    } else {
        const token = jwt.sign(user, process.env.SECRET_KEY);

        res.header("authorization", token).json({token});
    }

});

app.listen(port, (error) => {
    error ? console.log(error) : console.log("The server is running now");
})

// Pasa la variable tasks como middleware a los routers

app.use('/edit', (req, res, next) => {
  req.tasks = tasks;
  next();
}, listEditRouter); 

app.use('/view', (req, res, next) => {
  req.tasks = tasks;
  next();
}, listViewRouter);