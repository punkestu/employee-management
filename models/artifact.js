class Artifact {
  constructor({
    id,
    task_id,
    type,
    files,
    comments,
    tags,
    created_at,
    updated_at,
    deleted_at,
    deleted_by,
  }) {
    this.id = id;
    this.task_id = task_id;
    this.type = type;
    this.files = files;
    this.comments = comments;
    this.tags = tags;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.deleted_by = deleted_by;
  }
}

module.exports = { Artifact };
