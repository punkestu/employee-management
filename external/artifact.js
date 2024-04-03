const { Artifact } = require("../models/artifact");
const { Comment } = require("../models/comment");

const data = [
  new Artifact({
    id: 1,
    task_id: 1,
    type: "image",
    files: ["image1.jpg"],
    comments: [new Comment({ id: 1, message: "comment1", user_id: 1 })],
    tags: ["tag1", "tag2"],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    deleted_by: null,
  }),
];

const getArtifacts = () => new Promise((resolve) => resolve(data));
const getTaskArtifact = (task_id) =>
  new Promise((resolve) =>
    resolve(data.filter((artifact) => artifact.task_id === task_id))
  );
const createArtifact = (artifact) =>
  new Promise((resolve) => {
    const newArtifact = new Artifact({
      ...artifact,
      tags: artifact.tags || [],
      comments: [],
      id: data[data.length - 1].id + 1,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      deleted_by: null,
    });
    data.push(newArtifact);
    resolve(newArtifact);
  });
const addComment = (artifact_id, comment) =>
  new Promise((resolve) => {
    const artifact = data.find((artifact) => artifact.id === artifact_id);
    const newComment = new Comment({
      ...comment,
      id: artifact.comments[artifact.comments.length - 1].id + 1,
    });
    artifact.comments.push(newComment);
    resolve(newComment);
  });

module.exports = { getArtifacts, getTaskArtifact, createArtifact, addComment };
