const { User } = require("../models/user");

const data = [
  new User({
    id: 1,
    name: "Admin",
    username: "admin",
    password: "admin",
    email: "admin@test.com",
    role: "admin",
  }),
  new User({
    id: 3,
    name: "Employee1",
    username: "employee1",
    password: "employee1",
    email: "employee1@mail.com",
    role: "employee",
  }),
  new User({
    id: 4,
    name: "Employee2",
    username: "employee2",
    password: "employee2",
    email: "employee2@mail.com",
    role: "employee",
  }),
  new User({
    id: 5,
    name: "Employee3",
    username: "employee3",
    password: "employee3",
    email: "employee3@mail.com",
    role: "employee",
  }),
];
const addUser = (user) =>
  new Promise((resolve) => {
    const newUser = new User({
      ...user,
      id: data[data.length - 1] ? data[data.length - 1].id + 1 : 1,
    });
    data.push(newUser);
    resolve(newUser);
  });
const getUser = () => new Promise((resolve) => resolve(data));

module.exports = {
  addUser,
  getUser,
};
