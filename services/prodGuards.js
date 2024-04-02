const error500 = (status, data) =>
  process.env["NODE_ENV"] === "production" && status === 500
    ? "Internal Server Error"
    : data;

module.exports = {
  error500,
};
