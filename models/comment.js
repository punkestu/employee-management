class Comment {
  constructor({ id, message, user_id }) {
    this.id = id;
    this.message = message;
    this.user_id = user_id;
  }
}

module.exports = { Comment };
