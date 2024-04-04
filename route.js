const route = require("express").Router();
const { login } = require("./controllers/auth");
const { getEmployees, addEmployee } = require("./controllers/employee");
const { getTasks, createTask, changeStatus } = require("./controllers/task");
const Artifact = require("./controllers/artifact");

route.post("/api/login", login);
route.post("/api/employees", addEmployee);
route.get("/api/employees", getEmployees);
route.get("/api/tasks", getTasks);
route.patch("/api/tasks/:id/status", changeStatus);
route.post("/api/tasks", createTask);
route.get("/api/tasks/:task_id/artifacts", Artifact.getAll);
route.post("/api/tasks/:task_id/artifacts", Artifact.create);
route.post("/api/tasks/:task_id/artifacts/:artifact_id/comments", Artifact.addComment);

module.exports = route;
