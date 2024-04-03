const route = require("express").Router();
const { login } = require("./controllers/auth");
const { getEmployees, addEmployee } = require("./controllers/employee");
const { getTasks, createTask, changeStatus } = require("./controllers/task");
const Artifact = require("./controllers/artifact");

route.post("/login", login);
route.post("/employees", addEmployee);
route.get("/employees", getEmployees);
route.get("/tasks", getTasks);
route.patch("/tasks/:id/status", changeStatus);
route.post("/tasks", createTask);
route.get("/tasks/:task_id/artifacts", Artifact.getAll);
route.post("/tasks/:task_id/artifacts", Artifact.create);
route.post("/tasks/:task_id/artifacts/:artifact_id/comments", Artifact.addComment);

module.exports = route;
