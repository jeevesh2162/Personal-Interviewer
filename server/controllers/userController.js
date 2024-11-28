const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Interview = require("../models/chat");
const Topic = require("../models/questions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");






const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  // Check the password length requirements
  if (password.length < 8) {
    return res.status(400).json({ message: "Password length is less than 8" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password with a dynamically generated salt
    const salt = await bcrypt.genSalt(10); // Dynamically generated salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user with the hashed password
    const newUser = new User({ email, username, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user already has a valid token (logged in)
    if (user.token) {
      // Invalidate the existing token
      user.token = null;
      await user.save(); // Save the user with nullified token
    }


    // Create a new JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    console.log(token);

    

    // Send the new token as the response
    res.json({ body: token });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};



// for question answers fetch
const resultPage = async (req, res) => {
  try { 
    // Get the user ID or username from the request (assuming it's in req.params or req.query)
    const user = req.email;

    // Check if user parameter is provided
    if (!user) {
      return res.status(400).json({ message: "User parameter is required" });
    }

    // Fetch all topics and their corresponding interview data for the specified user
    const userInterviews = await Interview.find({ user }, 'topic interviewData'); // Filter by user and select only topic and interviewData
    console.log(userInterviews)
    // Check if there are any topics for the specified user
    if (userInterviews.length > 0) {
      res.json(userInterviews);
    } else {
      res.status(404).json({ message: "No topics found for the specified user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






const chat = async (req, res) => {
  const { topic, interviewData } = req.body;
console.log(topic, interviewData);
const user =req.email;
  try {
    // Determine whether interviewData is an array or not
    const updateOperation = Array.isArray(interviewData)
      ? { $push: { interviewData: { $each: interviewData } } }  // Use $each for arrays
      : { $push: { interviewData } }; // Directly push the object if it's not an array

    // Use updateOne to append interviewData directly
    const result = await Interview.updateOne(
      { user, topic }, // Find the document with the matching user and topic
      updateOperation, // Append based on the type of interviewData
      { upsert: true } // If the document doesn't exist, create a new one
    );

    console.log("Data appended or new entry created:", result);
    res.status(200).json({ message: "Data successfully updated" });
  } catch (error) {
    console.error("Error appending interview data:", error);
    res.status(500).json({ error: "Failed to append data" });
  }
};





// gemini question generation
const gemini = async (req, res) => {
  // console.log(res);
  try {
    const apiKey = process.env.API_KEY_GEMINI;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not found" });
    }

    // Initialize the generative AI with the API key
    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
    // Example prompt
    console.log(req.body);
    const prompt = `Given the input "${req.body.body}". Now check the syllabus for this interview and find questions and store them ,provided a sample JSON object with the following format:

{
  "OSI": [
    "Question 1 about OSI?",
    "Question 2 about OSI?",
    "Question 3 about OSI?"
  ],
  "OI": [
    "Question 1 about OI?",
    "Question 2 about OI?",
    "Question 3 about OI?"
  ]
};

Ensure the response includes 3 questions from each topic one easy one medium and one hard and atleast 5 topics, 

Return ONLY the JSON object, with no additional text.
 `;

    // Call the Generative AI model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // generating the output
    const generate = async (p) => {
      try {
        const result = await model.generateContent(p);
        const parsedResult = JSON.parse(result.response.text());

        console.log(parsedResult);
        // Send the result as a response
        res.send(parsedResult);
      } catch (err) {
        console.log(err);
        res.status(500).send("Error generating or saving the result.");
      }
    };

    generate(prompt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  chat,
  gemini,
  resultPage,
};
