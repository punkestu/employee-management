const { taskStatus } = require("../../models/task");
const { Task } = require("../../models/task");
const { HttpError } = require("../../models/error");
const { validate, handle } = require("./lib");

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
    validate(
      () =>
        !title ||
        !description ||
        !status ||
        !asignees ||
        !reviewers ||
        !start_date ||
        !due_date,
      "*",
      "All fields are required"
    )()
      .then(
        validate(
          () => !asignees.length,
          "asignees",
          "At least one asignee is required"
        )
      )
      .then(
        validate(
          () => !reviewers.length,
          "reviewers",
          "At least one reviewer is required"
        )
      )
      .then(
        validate(
          async () =>
            await statusIsValid(status)()
              .then(() => false)
              .catch(() => true),
          "status",
          "Invalid status"
        )
      )
      .then(
        validate(
          () => new Date(start_date).toString() === "Invalid Date",
          "start_date",
          "Invalid date"
        )
      )
      .then(
        validate(
          () => new Date(due_date).toString() === "Invalid Date",
          "due_date",
          "Invalid date"
        )
      )
      .then(
        validate(
          () => new Date(start_date) > new Date(due_date),
          "due_date",
          "Due date must be after start date"
        )
      )
      .then(
        handle(
          [resolve, reject],
          400,
          new Task({
            title,
            description,
            status,
            asignees,
            reviewers,
            start_date,
            due_date,
          })
        )
      );
  });

const isReviewer = (task) => (user) =>
  new Promise((resolve, reject) => {
    !task.reviewers.some((reviewer) => reviewer.id === user.id)
      ? reject(new HttpError(403, "Not reviewer"))
      : resolve(task);
  });

const isAsignee = (task) => (user) =>
  new Promise((resolve, reject) => {
    !task.asignees.some((asignee) => asignee.id === user.id)
      ? reject(new HttpError(403, "Not asignee"))
      : resolve(task);
  });

const isMember = (task) => (user) =>
  new Promise((resolve, reject) => {
    !task.asignees.some((asignee) => asignee.id === user.id) &&
    !task.reviewers.some((reviewer) => reviewer.id === user.id)
      ? reject(new HttpError(403, "Not member"))
      : resolve(task);
  });

const statusIsValid = (status) => (payload) =>
  new Promise((resolve, reject) => {
    status === undefined
      ? reject(new HttpError(400, "Status is required"))
      : !Object.values(taskStatus).includes(status)
      ? reject(new HttpError(400, "Invalid status"))
      : resolve(payload);
  });

module.exports = {
  isReviewer,
  isAsignee,
  isMember,
  statusIsValid,
  createTask,
};
