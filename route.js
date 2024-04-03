const route = require("express").Router();
const { login } = require("./controllers/auth");
const { getEmployees, addEmployee } = require("./controllers/employee");
const { getTasks, createTask, changeStatus } = require("./controllers/task");

route.post("/login", login);
route.post("/employees", addEmployee);
route.get("/employees", getEmployees);
route.get("/tasks", getTasks);
route.patch("/tasks/:id/status", changeStatus);
route.post("/tasks", createTask);

module.exports = route;
