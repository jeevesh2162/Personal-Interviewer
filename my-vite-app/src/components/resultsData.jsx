// // ResultsData.js
// import React from "react";
// import { useParams, useLocation } from "react-router-dom";
// import "./resultsData.css";

// export const ResultsData = () => {
//   const { id } = useParams(); // Retrieve the topic ID from the URL
//   const location = useLocation();
//   const topicData = location.state?.topic; // Access the `topic` passed via state

//   // Debugging log
//   console.log("Received topicData:", topicData);

//   return (
//     <div>
//       <h2>Topic Details for ID: {id}</h2>
//       <h3>Topic Name: {topicData?.topic || "Topic data not available"}</h3>
//       <p>Interview Data: {JSON.stringify(topicData?.interviewData) || "No interview data available"}</p>
//     </div>
//   );
// };


// ResultsData.js


// import React, { useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import "./resultsData.css"

// export const ResultsData = () => {
//   const { id } = useParams(); // Retrieve the topic ID from the URL
//   const location = useLocation();
//   const topicData = location.state?.topic; // Access the topic passed via state

//   // Debugging log
//   console.log("Received topicData:", topicData);
//   console.log(topicData.interviewData);
//   const [messages, setMessages] = useState([
//     { type: "question", text: "What is your experience with React?" },
//     { type: "response", text: "I have been working with React for 2 years." },
//     { type: "question", text: "How do you manage state in React?" },
//   ]);
//   // const messages= topicData.interviewData;

//   return (
//     <div className="chat-section">
//       <div className="chat-header">
//         <h2>Interview Questions</h2>
//       </div>
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div key={index} className={`chat-message ${message.type}`}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <div className="controls">
//         <button>End Interview</button>
//         <button>Next Question</button>
//       </div>
//     </div>
//   );
// };


import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./resultsData.css";

export const ResultsData = () => {
  const { id } = useParams(); // Retrieve the topic ID from the URL
  const location = useLocation();
  const topicData = location.state?.topic; // Access the topic passed via state

  // Debugging log
  console.log("Received topicData:", topicData);
  console.log("Interview Data:", topicData.interviewData);

  const [messages, setMessages] = useState(topicData.interviewData || []);

  return (
    <div className="chat-section">
      <div className="chat-header">
        <h2>Interview Questions</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type}`}>
            {typeof message.text === "string" 
              ? message.text 
              : message.text && typeof message.text === "object" 
              ? JSON.stringify(message.text) 
              : "No text available"}
          </div>
        ))}
      </div>
      <div className="controls">
        <button>End Interview</button>
        <button>Next Question</button>
      </div>
    </div>
  );
};
