const express = require("express");
const {
  registerUser,
  resultPage,
  loginUser,
  chat,
  gemini,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware"); // Adjust path if necessary

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);

// route to get the questions
router.get("/results", protect, resultPage);

// chat save karo
router.post("/chat", protect, chat);

// gemini
router.post("/gemini", gemini);

// test
router.get("/test", () => {
  console.log("checking");
});
module.exports = router;
