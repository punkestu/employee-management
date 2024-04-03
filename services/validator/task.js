const { taskStatus } = require("../../models/task");
const { Task } = require("../../models/task");
const { HttpError, HttpErrors } = require("../../models/error");

const createTask = ({
  title,
  description,
  status,
  asignees,
  reviewers,
  start_date,
  due_date,
}) =>
  new Promise((resolve, reject) => {
    const errors = new HttpErrors(400);
    if (
      !title ||
      !description ||
      !status ||
      !asignees ||
      !reviewers ||
      !start_date ||
      !due_date
    ) {
      errors.addError("*", "All fields are required");
      reject(errors);
    }
    if (!asignees.length) {
      errors.addError("asignees", "At least one asignee is required");
    }
    if (!reviewers.length) {
      errors.addError("reviewers", "At least one reviewer is required");
    }
    statusIsValid(status)({}).catch((error) =>
      errors.addError("status", error.message)
    );
    const start = new Date(start_date);
    if (start.toString() === "Invalid Date") {
      errors.addError("start_date", "Invalid date");
    }
    const due = new Date(due_date);
    if (due.toString() === "Invalid Date") {
      errors.addError("due_date", "Invalid date");
    }
    if (start > due) {
      errors.addError("due_date", "Due date must be after start date");
    }
    if (errors.isError()) {
      reject(errors);
    }
    resolve(
      new Task({
        title,
        description,
        status,
        asignees,
        reviewers,
        start_date,
        due_date,
      })
    );
  });

const isReviewer = (task) => (user) =>
  new Promise((resolve, reject) => {
    if (!task.reviewers.some((reviewer) => reviewer.id === user.id)) {
      reject(new HttpError(403, "Not reviewer"));
    }
    resolve(task);
  });

const statusIsValid = (status) => (payload) =>
  new Promise((resolve, reject) => {
    if (status === undefined) {
      reject(new HttpError(400, "Status is required"));
    }
    if (!Object.values(taskStatus).includes(status)) {
      reject(new HttpError(400, "Invalid status"));
    }
    resolve(payload);
  });

module.exports = {
  isReviewer,
  statusIsValid,
  createTask,
};
