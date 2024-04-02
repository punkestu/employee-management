class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class HttpErrors {
  constructor(status) {
    this.status = status;
    this.errors = new Map();
  }
  addError(key, message) {
    if (!this.errors.has(key)) {
      this.errors.set(key, []);
    }
    this.errors.get(key).push(message);
  }
  getErrors() {
    return Object.fromEntries(this.errors);
  }
  isError() {
    return this.errors.size > 0;
  }
}

module.exports = { HttpError, HttpErrors };
