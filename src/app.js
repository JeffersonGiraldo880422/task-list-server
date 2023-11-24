const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

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

// Middleware para verificar la autenticación
const authVerification = (req, res, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(403).json({ error: "No te has autenticado" }); // 403 Forbidden
  }

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Acceso denegado" }); // 403 Forbidden
    }
    next();
  });
};

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

// Lista global de tareas
global.tasks = [];

// Endpoint para crear una nueva tarea
app.post("/tasks", authVerification, (req, res) => {
    const newTask = req.body;
    
    // Generar un nuevo ID para la tarea
    newTask.id = global.tasks.length + 1;

    // Asegurarnos de que todas las tareas tengan la propiedad isCompleted
    if (newTask.isCompleted === undefined) {
        newTask.isCompleted = false;
    }

    // Agregar la nueva tarea a la lista global
    global.tasks.push(newTask);
    
    res.status(201).json(newTask); // 201 Created
});

// Endpoint para obtener todas las tareas
app.get("/tasks", authVerification, (req, res) => {
  res.json(global.tasks);
});

// Endpoint para obtener una tarea por su ID
app.get("/tasks/:id", authVerification, (req, res) => {
  const taskId = req.params.id;
  const task = global.tasks.find(task => task.id === parseInt(taskId));

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" }); // 404 Not Found
  }

  res.json(task);
});

// Endpoint para actualizar una tarea por su ID
app.put("/tasks/:id", authVerification, (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  const taskToUpdate = global.tasks.find(task => task.id === parseInt(taskId));

  if (!taskToUpdate) {
    return res.status(404).json({ error: "Tarea no encontrada" }); // 404 Not Found
  }

  Object.assign(taskToUpdate, updatedTask);

  res.json(taskToUpdate);
});

// Endpoint para eliminar una tarea por su ID
app.delete("/tasks/:id", authVerification, (req, res) => {
  const taskId = req.params.id;
  const taskIndex = global.tasks.findIndex(task => task.id === parseInt(taskId));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" }); // 404 Not Found
  }

  const deletedTask = global.tasks.splice(taskIndex, 1);

  res.json(deletedTask);
});

// Endpoint para obtener tareas completadas
app.get("/tasks/t/completed", authVerification, (req, res) => {
    const completedTasks = global.tasks.filter(tasks => tasks.isCompleted);
    res.json(completedTasks);

});

// Endpoint para obtener tareas incompletas
app.get("/tasks/t/incomplete", authVerification, (req, res) => {
  const incompleteTasks = global.tasks.filter(tasks => !tasks.isCompleted);
  res.json(incompleteTasks);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
