import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Replace with your backend URL

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    // Return the successful response data
    return response.data;
  } catch (error) {    
    // Log and throw other errors
    console.log(error);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Function to login a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const fetchQuestions = async (topic) => {
  try {
    const response = await axios.get(`${API_URL}/questions`); // Call backend API
    // const response = await axios.get(`${API_URL}/questions/${topic}`); // Call backend API
    // console.log(response.data);
    return response.data; // Return the array of questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};


export const gemini = async(prompt)=>{
  try {
    console.log(prompt);
    const response = await axios.post(`${API_URL}/gemini`,prompt); // Call backend API
    
    return response.data; // Return the array of questions
  } catch (error) {
    console.error("Error in string the questions in database", error);
    return [];
  }
}


export const chat = async(prompt)=>{
  try {
    console.log(prompt);
    const response = await axios.post(`${API_URL}/chat`,prompt,{headers:{"authorization":JSON.parse(localStorage.getItem("loggedinuser")).body}}); // Call backend API
    
    return response.data; // Return the array of questions
  } catch (error) {
    console.error("Error in string the questions in database", error);
    return [];
  }
}
