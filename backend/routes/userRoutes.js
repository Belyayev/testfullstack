const express = require("express");
const router = express.Router();
const {
  registerUser,
  passwordResetRequest,
  passwordResetExecution,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.put("/passwordresetrequest", passwordResetRequest);
router.put("/passwordresetexecution", passwordResetExecution);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
