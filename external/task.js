const { HttpError } = require("../models/error");
const { Task, taskStatus } = require("../models/task");
const { getUser } = require("./user");

const data = [
  new Task({
    id: 1,
    title: "Task 1",
    description: "Description 1",
    status: taskStatus.PENDING,
    asignees: [2, 5],
    reviewers: [4],
    start_date: new Date("2021-01-01"),
    due_date: new Date("2021-12-31"),
  }),
];
const getTasks = () =>
  new Promise(async (resolve) => {
    const users = await getUser();
    resolve(
      data.map((task) => {
        return {
          ...task,
          asignees: users
            .filter((user) => task.asignees.includes(user.id))
            .map((asignee) => ({ ...asignee, password: undefined })),
          reviewers: users
            .filter((user) => task.reviewers.includes(user.id))
            .map((asignee) => ({ ...asignee, password: undefined })),
        };
      })
    );
  });
const updateTask = (id, { status }) =>
  new Promise(async (resolve, reject) => {
    const task = data.find((task) => task.id === id);
    if (!task) {
      reject(new HttpError(404, "Task not found"));
    }
    task.status = status || task.status;
    resolve(task);
  });
const createTask = (task) =>
  new Promise((resolve) => {
    data.push(new Task({ ...task, id: data[data.length - 1].id + 1 }));
    resolve(data[data.length - 1]);
  });

module.exports = {
  getTasks,
  updateTask,
  createTask,
};
