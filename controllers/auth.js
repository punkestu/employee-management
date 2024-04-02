const authService = require("../services/auth");
const { getUser } = require("../external/user");
const { generateToken } = require("../external/jwt");
const { error500 } = require("../services/prodGuards");

const login = async (req, res) => {
  try {
    const result = await getUser()
      .then(authService.login(req.body))
      .then(generateToken());
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error500(error.status || 500, error.message) });
  }
};

module.exports = {
  login,
};
