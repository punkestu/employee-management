const { HttpErrors } = require("../../models/error");

const createArtifact = ({ type, files, tags }) => {
  return new Promise((resolve, reject) => {
    const errors = new HttpErrors(400);
    if (!type || !files) {
      errors.addError("*", "All fields are required");
      reject(errors);
    }
    resolve({ type, files: Array.isArray(files) ? files : [files], tags });
  });
};

const addComment = ({ message }) => {
  return new Promise((resolve, reject) => {
    const errors = new HttpErrors(400);
    if (!message) {
      errors.addError("message", "Message is required");
      reject(errors);
    }
    resolve({ message });
  });
};

module.exports = { createArtifact, addComment };
