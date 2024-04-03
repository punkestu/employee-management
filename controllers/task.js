const TaskE = require("../external/task");
const { getTokenFromBearer } = require("../services/auth");
const {
  isReviewer,
  statusIsValid,
  createTask: createTaskValidator,
} = require("../services/validator/task");
const { validateToken } = require("../external/jwt");
const { error500 } = require("../services/prodGuards");
const { HttpError, HttpErrors } = require("../models/error");

const getTasks = async (req, res) => {
  try {
    await getTokenFromBearer(req.headers.authorization).then(validateToken);
    const tasks = await TaskE.getTasks();
    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

const changeStatus = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await TaskE.getTasks()
      .then((tasks) => tasks.find((task) => task.id === taskId))
      .then((task) => (task ? { ...task } : null));
    if (!task) throw new HttpError(404, "Task not found");
    await getTokenFromBearer(req.headers.authorization)
      .then(validateToken)
      .then(statusIsValid(req.body.status))
      .then(isReviewer(task));
    await TaskE.updateTask(taskId, { status: req.body.status });
    return res.status(200).json({ message: "changed" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await createTaskValidator(req.body).then(TaskE.createTask);
    return res.status(201).json({ data: task });
  } catch (error) {
    if (error instanceof HttpErrors) {
      return res.status(error.status || 500).json({
        errors: error500(error.status || 500, error.getErrors()),
      });
    }
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

module.exports = {
  getTasks,
  changeStatus,
  createTask,
};
