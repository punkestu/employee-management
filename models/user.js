class User {
  constructor({ id, name, username, email, password, role }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

module.exports = { User };
