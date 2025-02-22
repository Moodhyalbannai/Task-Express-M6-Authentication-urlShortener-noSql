const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: `${process.env.JWT_TOKEN_EXP}d`,
  });
  return token;
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
0;
