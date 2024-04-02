const route = require("express").Router();
const { login } = require("./controllers/auth");
const { getEmployees, addEmployee } = require("./controllers/employee");

route.post("/login", login);
route.post("/employees", addEmployee);
route.get("/employees", getEmployees);

module.exports = route;
