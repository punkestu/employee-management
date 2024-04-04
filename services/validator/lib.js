const { HttpErrors } = require("../../models/error");

const validate = (condition, path, errMessage) => (errors) =>
  new Promise(async (resolve) => {
    if (await condition()) {
      console.log(errMessage);
      if (errors) {
        resolve({ ...errors, [path]: [...(errors[path] || []), errMessage] });
      } else {
        resolve({ [path]: [errMessage] });
      }
    }
    resolve(errors);
  });

const handle = ([resolve, reject], code, payload) => (errors) => {
  if (errors) {
    reject(new HttpErrors(code, errors));
  }
  resolve(payload);
};

module.exports = {
  validate,
  handle,
};
