const authService = require("../services/auth");
const { getUser } = require("../external/user");
const { generateToken, validateToken } = require("../external/jwt");
const { error500 } = require("../services/prodGuards");

const login = async (req, res) => {
  try {
    const result = await getUser()
      .then((users) =>
        users.find((user) => user.username === req.body.username)
      )
      .then((user) => {
        if (!user) throw new Error("User not found");
        return user;
      })
      .then(authService.login(req.body))
      .then(generateToken());
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

const profile = async (req, res) => {
  try {
    const user = await authService
      .getTokenFromBearer(req.headers.authorization)
      .then(validateToken);
    return res
      .status(200)
      .json({ data: { ...user, iat: undefined, exp: undefined } });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

module.exports = {
  login,
  profile,
};
