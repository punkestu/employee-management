const {
  getTaskArtifact,
  createArtifact,
  addComment,
} = require("../external/artifact");
const { getTasks } = require("../external/task");
const validator = require("../services/validator/artifact");
const { error500 } = require("../services/prodGuards");
const { validateToken } = require("../external/jwt");
const { getTokenFromBearer } = require("../services/auth");
const { isAsignee, isMember } = require("../services/validator/task");
const { Artifact } = require("../models/artifact");
const { HttpErrors } = require("../models/error");

const getAll = async (req, res) => {
  try {
    await getTokenFromBearer(req.headers.authorization).then(validateToken);
    const artifacts = await getTaskArtifact(parseInt(req.params.task_id));
    res.status(200).json(artifacts);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

const create = async (req, res) => {
  try {
    const task = await getTasks().then((tasks) =>
      tasks.find((task) => task.id === parseInt(req.params.task_id))
    );
    if (!task) {
      throw { status: 404, message: "Task not found" };
    }
    await getTokenFromBearer(req.headers.authorization)
      .then(validateToken)
      .then(isAsignee(task));
    const artifact = await validator
      .createArtifact(req.body)
      .then((content) =>
        createArtifact(new Artifact({ ...content, task_id: task.id }))
      );
    res.status(201).json(artifact);
  } catch (error) {
    if (error instanceof HttpErrors) {
      return res.status(error.status || 500).json({
        errors: error500(error.status || 500, error.getErrors()),
      });
    }
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

const addCommentC = async (req, res) => {
  try {
    const task = await getTasks().then((tasks) =>
      tasks.find((task) => task.id === parseInt(req.params.task_id))
    );
    if (!task) {
      throw { status: 404, message: "Task not found" };
    }
    const user = await getTokenFromBearer(req.headers.authorization).then(
      validateToken
    );
    const artifact = await isMember(task)(user)
      .then(() => getTaskArtifact(task.id))
      .then((artifacts) =>
        artifacts.find(
          (artifact) => artifact.id === parseInt(req.params.artifact_id)
        )
      );
    if (!artifact) {
      throw { status: 404, message: "Artifact not found" };
    }
    const comment = await validator
      .addComment(req.body)
      .then((content) =>
        addComment(artifact.id, { ...content, user_id: user.id })
      );
    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof HttpErrors) {
      return res.status(error.status || 500).json({
        errors: error500(error.status || 500, error.getErrors()),
      });
    }
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

module.exports = { getAll, create, addComment: addCommentC };
