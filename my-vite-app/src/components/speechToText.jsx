// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Import axios for API requests
// import { Video } from "./video.jsx";
// import { chat, gemini } from "../api/userApi";
// import "./speechtotext.css";

// export const SpeechToText = () => {
//   const recognitionRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [isInterviewActive, setIsInterviewActive] = useState(false);
//   const [messages, setMessages] = useState([]); // Store chat messages
//   const [isChatVisible, setIsChatVisible] = useState(true); // State to toggle chat visibility
//   const [questions, setQuestions] = useState({}); // Store questions from gemini/local storage
//   const [interviewTopic, setInterviewTopic] = useState(""); // Store user input for interview topic
//   const [inputSubmitted, setInputSubmitted] = useState(false); // Track if input is submitted
//   const [isVideoOn, setIsVideoOn] = useState(true); // State to track video on/off
//   const [prompt, setPrompt] = useState({});
//   const [response , setResponse] = useState("");
//   const results = new Set();
//   const results_used = new Set();
//   const navigate = useNavigate();

//   // Helper function to add delay
//   function delay(ms) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   }


//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
//     if (!SpeechRecognition) {
//       console.error("Speech recognition is not supported by this browser.");
//       return;
//     }
  
//     let ask = "";
//     const recognition = new SpeechRecognition();
//     let firstvisit = true;
  
//     recognition.onstart = async function () {
//       ask = "";
//       if (!isInterviewActive) {
//         await stopRecognition();
//       } else {
//         if (firstvisit === true) {
//           await delay(2000);
//           ask = "Introduce yourself, please";
//           firstvisit = false;
//         } 
        
//         else if (results.size > 0) {
//           ask = Array.from(results).shift();
//           results_used.add(ask);
//           results.delete(ask);
//         } 
        
//         else {
//           // Fetch questions for the specified topic from user input
//           const len = Object.keys(questions).length;
//           const word = Object.keys(questions)[Math.floor(Math.random() * len)];
//           const fetchedQuestions = questions[word];
//           fetchedQuestions.forEach((question) => {
//             if (!results_used.has(question)) results.add(question);
//           });
  
//           ask = Array.from(results).shift();
//           results_used.add(ask);
//           results.delete(ask);
//         }
//         await readOut(ask);
//         setIsListening(true);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: ask, type: "question" },
//         ]);
  
//         // save question in the database
//         await chat({
//           user: JSON.stringify(localStorage.getItem('loggedinuser')),
//           topic: prompt.body,
//           interviewData: { text: ask, type: "question" }
//         });
//       }
//     };
  
//     recognition.continuous = true;
  
//     recognition.onresult = async function (event) {
//       // console.log("onresult");
//       let current = await event.resultIndex;
//       let transcript1 = await event.results[current][0].transcript.trim();
//       console.log(transcript1);
//       // setTranscript(transcript1);
//       console.log("A");
//       if (transcript1[0] !== ask[0] && transcript1[1] !== ask[1]) {
     
        
//         setMessages((prevMessages) => {
//           // Check if the last message is of type "response"
//           if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].type === "response") {
//             console.log("C1");
//             const updatedMessages = [...prevMessages];
//             updatedMessages[updatedMessages.length - 1].text += ` ${transcript1}`; // Append transcript
//             return updatedMessages;
//           } else {
//             // Add a new message if the last one is not a response
//             console.log("C2");
//             return [...prevMessages, { text: transcript1, type: "response" }];
//           }
//         });
//       }
//       console.log("D");
  
//       // Process transcript for matching questions
//       const words = transcript1.split(" ");
//       for (let word of words) {
//         word = word.replace(/[.,]/g, ""); // Remove punctuation
//         if (questions[word]) {
//           const fetchedQuestions = questions[word];
//           fetchedQuestions.forEach((question) => {
//             if (!results_used.has(question)) results.add(question);
//           });
//         }
//       }
  
//       if (results.size > 0) {
//         console.log("The corresponding values are: ", Array.from(results));
//       } else {
//         console.log("No matching statements found in the database.");
//       }
//     };
  
//     recognition.onend = async function () {
//       // Save data in the database
//       await chat({
//         user: JSON.stringify(localStorage.getItem('loggedinuser')),
//         topic: prompt.body,
//         interviewData: { text: transcript, type: "response" }
//       });
  
//       if (!isInterviewActive) {
//         await readOut("Your interview has ended.");
//         // setQuestions({});
//       } else {
//         await readOut("Let me search for the next problem");
//         if (!isListening && recognitionRef.current) {
//           recognitionRef.current.start();
//           setIsListening(true);
//         }
//       }
//     };
  
//     recognitionRef.current = recognition;
  
//     function readOut(message) {
//       return new Promise((resolve) => {
//         const speech = new SpeechSynthesisUtterance();
//         speech.text = message;
//         speech.volume = 1;
//         speech.onend = resolve;
//         window.speechSynthesis.speak(speech);
//       });
//     }
//   }, [isInterviewActive, interviewTopic]);
  
  

//   const startRecognition = async () => {
//     if (videoRef.current && !isInterviewActive) {
//       setIsInterviewActive(true);
//       await videoRef.current.startRecording();
//     }
//     if (!isListening && recognitionRef.current) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopRecognition = async () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const endInterview = async () => {
//     setIsInterviewActive(false);
//     await stopRecognition();
//     if (videoRef.current) {
//       await videoRef.current.stopRecording();
//     }

//     // Send messages to the backend
//     try {
//       const response = await axios.post("/api/chat", { messages });
//       console.log("Messages successfully sent to the backend:", response.data);
//     } catch (error) {
//       console.error("Error sending messages to the backend:", error);
//     }

//     await delay(1000);
//     console.log(messages);
//     navigate("/results");
//   };

//   const toggleChatVisibility = () => {
//     setIsChatVisible((prev) => !prev);
//   };

//   const handleInputChange = (e) => {
//     setInterviewTopic(e.target.value); // Update topic input state
    
//     setPrompt({ body: e.target.value  }); // json format
//   };

//   const handleInputSubmit = async (e) => {
//     e.preventDefault();
//     console.log(prompt);
    
//     // use this prompt to create catagory of chat 
//     // send it to backend
//     // const chat1 = await chat({topic: prompt.body,interviewData:{ text:NULL, type: NULL}});

//     try {
//       const response = await gemini(prompt);
//       setQuestions(response);
//       console.log(response);
//       setInputSubmitted(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Function to toggle the video on/off
//   const toggleVideo = () => {
//     if (isVideoOn && videoRef.current) {
//       videoRef.current.stopRecording(); // Stop the video
//     } else if (videoRef.current) {
//       videoRef.current.startRecording(); // Start the video
//     }
//     setIsVideoOn((prev) => !prev); // Update the state
//   };

//   return (
//     <main className="speechtotext_main">
//       {!inputSubmitted ? (
//         // Display input field before interview section
//         <div className="input-section">
//           <label htmlFor="interview-topic">
//             Please enter the field/job for the interview:
//           </label>
//           <input
//             type="text"
//             id="interview-topic"
//             value={interviewTopic}
//             onChange={handleInputChange}
//             placeholder="e.g., Software Engineer"
//           />
//           {/* <button onClick={async () => await chat({topic:prompt.body,interviewData:{ text: "ask", type: "question" }}) }>test</button> */}
//           <button onClick={handleInputSubmit} disabled={!interviewTopic}>
//             Submit
//           </button>
//         </div>
//       ) : (
//         // Interview section after input is submitted
//         <div className="interview-section">
//           <div className="video-section">
//             <Video ref={videoRef} />
//             <button onClick={toggleVideo}>
//               {isVideoOn ? "Turn Off Video" : "Turn On Video"}
//             </button>
//           </div>
//           <div className="chat-section">
//             <div className="chat-header">
//               <h2>Interview Chat</h2>
//               <button onClick={toggleChatVisibility}>
//                 {isChatVisible ? "Hide Chat" : "Show Chat"}
//               </button>
//             </div>
//             {isChatVisible && (
//               <div className="chat-messages">
//                 {messages.map((message, index) => (
//                   <div key={index} className={`chat-message ${message.type}`}>
//                     {message.text}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="controls">
//               <button onClick={startRecognition} disabled={isListening}>
//                 Start
//               </button>
//               <button onClick={stopRecognition} disabled={!isListening}>
//                 Stop
//               </button>
//               <button onClick={endInterview} disabled={!isInterviewActive}>
//                 End Interview
//               </button>
              
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };


import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Video } from "./video.jsx";
import { chat, gemini } from "../api/userApi";
import "./speechtotext.css";

export const SpeechToText = () => {
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [questions, setQuestions] = useState({});
  const [interviewTopic, setInterviewTopic] = useState("");
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [prompt, setPrompt] = useState({});
  const results = new Set();
  const results_used = new Set();
  const navigate = useNavigate();

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition is not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    let ask = "";
    let firstVisit = true;

    recognition.onstart = async () => {
      ask = "";
      if (!isInterviewActive) {
        await stopRecognition();
      } else {
        if (firstVisit) {
          await delay(2000);
          ask = "Introduce yourself, please";
          firstVisit = false;
        } else if (results.size > 0) {
          ask = Array.from(results).shift();
          results_used.add(ask);
          results.delete(ask);
        } else {
          const len = Object.keys(questions).length;
          const word = Object.keys(questions)[Math.floor(Math.random() * len)];
          questions[word].forEach((question) => {
            if (!results_used.has(question)) results.add(question);
          });
          ask = Array.from(results).shift();
          results_used.add(ask);
          results.delete(ask);
        }
        await readOut(ask);
        setIsListening(true);
        setMessages((prev) => [...prev, { text: ask, type: "question" }]);

        await chat({
          // user: JSON.stringify(localStorage.getItem("loggedinuser")),
          topic: prompt.body,
          interviewData: { text: ask, type: "question" },
        });
      }
    };

    recognition.continuous = true;

    recognition.onresult = async (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim();

      console.log(messages);
      setMessages((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].type === "response") {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].text += ` ${transcript}`;
          return updatedMessages;
        } else {
          return [...prev, { text: transcript, type: "response" }];
        }
      });

      transcript.split(" ").forEach((word) => {
        word = word.replace(/[.,]/g, "");
        if (questions[word]) {
          questions[word].forEach((question) => {
            if (!results_used.has(question)) results.add(question);
          });
        }
      });
    };

    recognition.onend = async () => {
      await chat({
        // user: JSON.stringify(localStorage.getItem("loggedinuser")),
        topic: prompt.body,
        interviewData: { text: messages[messages.length-1], type: "response" },
      });
      console.log(messages);

      if (!isInterviewActive) {
        await readOut("Your interview has ended.");
      } else {
        await readOut("Let me search for the next problem");
        if (!isListening && recognitionRef.current) {
          recognitionRef.current.start();
          setIsListening(true);
        }
      }
    };

    recognitionRef.current = recognition;

    function readOut(message) {
      return new Promise((resolve) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = message;
        speech.volume = 1;
        speech.onend = resolve;
        window.speechSynthesis.speak(speech);
      });
    }
  }, [isInterviewActive, questions, prompt]);

  const startRecognition = async () => {
    if (videoRef.current && !isInterviewActive) {
      setIsInterviewActive(true);
      await videoRef.current.startRecording();
    }
    if (!isListening && recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopRecognition = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const endInterview = async () => {
    setIsInterviewActive(false);
    await stopRecognition();
    if (videoRef.current) {
      await videoRef.current.stopRecording();
    }

    // try {
    //   const response = await chat({messages});
    // } catch (error) {
    //   console.error("Error sending messages to the backend:", error);
    // }

    await delay(1000);
    navigate("/results");
  };

  const toggleChatVisibility = () => setIsChatVisible((prev) => !prev);

  const handleInputChange = (e) => {
    setInterviewTopic(e.target.value);
    setPrompt({ body: e.target.value });
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await gemini(prompt);
      setQuestions(response);
      setInputSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleVideo = () => {
    if (isVideoOn && videoRef.current) {
      videoRef.current.stopRecording();
    } else if (videoRef.current) {
      videoRef.current.startRecording();
    }
    setIsVideoOn((prev) => !prev);
  };

  return (
    <main className="speechtotext_main">
      {!inputSubmitted ? (
        <div className="input-section">
          <label htmlFor="interview-topic">Please enter the field/job for the interview:</label>
          <input
            type="text"
            id="interview-topic"
            value={interviewTopic}
            onChange={handleInputChange}
            placeholder="e.g., Software Engineer"
          />
          <button onClick={handleInputSubmit} disabled={!interviewTopic}>
            Submit
          </button>
        </div>
      ) : (
        <div className="interview-section">
          <div className="video-section">
            <Video ref={videoRef} />
            <button onClick={toggleVideo}>
              {isVideoOn ? "Turn Off Video" : "Turn On Video"}
            </button>
          </div>
          <div className="chat-section">
            <div className="chat-header">
              <h2>Interview Chat</h2>
              <button onClick={toggleChatVisibility}>
                {isChatVisible ? "Hide Chat" : "Show Chat"}
              </button>
            </div>
            {isChatVisible && (
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`chat-message ${message.type}`}>
                    {message.text}
                  </div>
                ))}
              </div>
            )}
            <div className="controls">
              <button onClick={startRecognition} disabled={isListening}>
                Start
              </button>
              <button onClick={stopRecognition} disabled={!isListening}>
                Stop
              </button>
              <button onClick={endInterview} disabled={!isInterviewActive}>
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
