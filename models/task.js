const taskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

class Task {
  constructor({
    id,
    title,
    description,
    status,
    asignees,
    reviewers,
    start_date,
    due_date,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.asignees = asignees;
    this.reviewers = reviewers;
    this.start_date = start_date;
    this.due_date = due_date;
  }
}

module.exports = { Task, taskStatus };