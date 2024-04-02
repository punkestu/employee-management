const jwt = require("jsonwebtoken");
const { HttpError } = require("../models/error");

const generateToken = (options) => (user) =>
  new Promise((resolve) => {
    const _options = options || { expiresIn: "1h" };
    const token = jwt.sign({ ...user }, "shhhhh", _options);
    resolve({
      token,
    });
  });
const validateToken = (token) =>
  new Promise((resolve, reject) => {
    try {
      const result = jwt.verify(token, "shhhhh");
      resolve(result);
    } catch (error) {
      reject(new HttpError(401, error.message));
    }
  });

module.exports = {
  generateToken,
  validateToken,
};
