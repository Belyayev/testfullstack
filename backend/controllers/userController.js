const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const mailer = require("../config/mailer");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    mailer({ user, flag: "registration" });
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  const today = new Date();

  if (user && (await bcrypt.compare(password, user.password))) {
    user.lastLogin = today;
    await user.save();

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      lastLogin: today,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Requst password reset
// @route   PUT /api/users/passwordresetrequest
// @access  Public
const passwordResetRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // Check for user email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = createToken();

  console.log(resetToken);

  // Hash token
  const salt = await bcrypt.genSalt(10);
  const hashedToken = await bcrypt.hash(resetToken, salt);

  const testtoken = await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
  }).save();

  console.log.apply(testtoken);

  mailer({ user, resetToken, flag: "passwordresetrequest" });

  res.status(200).json({ message: "Password reset requested" });
});

// Execute password reset
// @route   PUT /api/users/passwordresetexecution
// @access  Public
const passwordResetExecution = asyncHandler(async (req, res) => {
  const { userId, token, password } = req.body;

  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    res.status(401);
    throw new Error("Invalid or expired password reset token");
  }

  // Check for user email
  const user = await User.findOne({ _id: userId });
  const today = new Date();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (user && (await bcrypt.compare(token, passwordResetToken.token))) {
    user.lastLogin = today;
    user.password = hashedPassword;

    await user.save();

    await passwordResetToken.deleteOne();

    mailer({ user, flag: "passwordresetsuccess" });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      lastLogin: today,
    });
  } else {
    res.status(400);
    throw new Error("Invalid or expired password reset token");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "30d",
  });
};

// Generate token using other method
const createToken = () => {
  return (tokenValue = Math.random().toString(36) + Math.random().toString(36));
};

module.exports = {
  registerUser,
  passwordResetRequest,
  passwordResetExecution,
  loginUser,
  getMe,
};
