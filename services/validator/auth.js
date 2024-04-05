const {HttpError} = require("../../models/error");

const isAdmin = (user) =>
  new Promise((res, rej) => {
    if (user.role !== "admin") {
      rej(new HttpError(403, "Not admin"));
    }
    res(user);
  });

module.exports = {
  isAdmin,
};
