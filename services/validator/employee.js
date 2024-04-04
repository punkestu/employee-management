const { HttpErrors } = require("../../models/error");
const { User } = require("../../models/user");

const register =
  ({ name, username, password, email, role }) =>
  (users) => {
    return new Promise((resolve, reject) => {
      const errors = new HttpErrors(400);
      if (!name || !username || !password || !email || !role) {
        errors.addError("*", "All fields are required");
      }
      if (users.length > 0){
        if (users.find((user) => user.username === username)) {
          errors.addError("username", "Username already exists");
        }
        if (users.find((user) => user.email === email)) {
          errors.addError("email", "Email already exists");
        }
      }
      if (!["employee"].includes(role)) {
        errors.addError("role", "Invalid role");
      }
      if (role === "admin") {
        errors.addError("role", "Cannot register as admin");
      }
      if (errors.isError()) {
        reject(errors);
      }
      resolve(new User({ name, username, password, email, role }));
    });
  };

module.exports = {
  register,
};
