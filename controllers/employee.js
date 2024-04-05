const employeeService = require("../services/employee");
const validate = require("../services/validator");
const { getTokenFromBearer } = require("../services/auth");
const { error500 } = require("../services/prodGuards");
const { getUser, addUser } = require("../external/user");
const { validateToken } = require("../external/jwt");
const { HttpErrors } = require("../models/error");

const getEmployees = async (req, res) => {
  try {
    await getTokenFromBearer(req.headers.authorization)
      .then(validateToken)
      .then(validate.auth.isAdmin);
    const employees = await getUser().then(employeeService.getEmployees);
    return res.status(200).json({ data: employees });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

const addEmployee = async (req, res) => {
  try {
    const result = await getUser()
      .then((users) =>
        users.filter(
          (user) =>
            user.username === req.body.username || user.email === req.body.email
        )
      )
      .then(validate.employee.register(req.body))
      .then(addUser);
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof HttpErrors) {
      return res.status(error.status || 500).json({
        errors: error500(error.status || 500, error.getErrors()),
      });
    }
    return res.status(error.status || 500).json({
      error: error500(error.status || 500, error.message),
    });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
};
