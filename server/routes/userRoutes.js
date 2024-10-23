const express = require('express');
const { registerUser, loginUser, chat, gemini } = require('../controllers/userController');


const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login an existing user
router.post('/login', loginUser);

// route to get the questions
// router.get('/questions', question);

// chat save karo 
router.post('/chat',chat);

// gemini
router.post('/gemini',gemini);

// test
router.get("/test",()=>{console.log("checking")});
module.exports = router;
