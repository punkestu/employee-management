const { HttpError } = require("../models/error");
const { User } = require("../models/user");

const login =
  ({ username, password }) =>
  (users) => {
    return new Promise((resolve, reject) => {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        resolve(new User({ ...user }));
      }
      reject(new HttpError(400, "Invalid credentials"));
    });
  };
const getTokenFromBearer = (authorization) =>
  new Promise((res, rej) => {
    const token = authorization ? authorization.split(" ")[1] : null;
    if (!token) {
      rej(new HttpError(401, "Unauthorized"));
    }
    res(token);
  });
module.exports = {
  login,
  getTokenFromBearer,
};
