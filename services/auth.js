const { HttpError } = require("../models/error");
const { User } = require("../models/user");

const login =
  ({ password }) =>
  (user) => {
    return new Promise((resolve, reject) => {
      if (user && user.password === password) {
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
