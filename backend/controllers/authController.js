const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const userData = await authService.registerUser(req.body);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const userData = await authService.loginUser(req.body);
    res.status(200).json(userData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
