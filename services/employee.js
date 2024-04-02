const getEmployees = (users) =>
  new Promise((resolve) => {
    resolve([...users.filter((user) => user.role === "employee")]);
  });

module.exports = {
  getEmployees,
};
