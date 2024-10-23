// import React from "react";
// import { UserProvider } from "./useContext.jsx"; // Import the UserProvider
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { TextToVoice } from "./components/textToVoice.jsx";
// import { SpeechToText } from "./components/speechToText.jsx";
// import ProtectedRoute from "./components/protectedRoute.jsx";
// import Login from "./components/Login.jsx";
// import { Navbar } from "./components/navigation/Navbar.jsx";
// import { Home } from "./components/Home.jsx";
// import { Results } from "./components/Results.jsx";
// import { Signup } from "./components/Signup.jsx";
// import "./App.css";

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <div className="main">
//           <div className="navbar">
//             <Navbar />
//           </div>
//           <div className="content">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route
//                 path="/speechToText"
//                 element={
//                   <ProtectedRoute>
//                     <SpeechToText />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route path="/text-to-voice" element={<TextToVoice />} />
//               <Route path="/login" element={<Login />}/>
//               <Route path="/signup" element={<Signup />}/>
//               <Route path="/results" element={<Results/>} />
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;


import React from "react";
import { UserProvider } from "./useContext.jsx"; // Import the UserProvider
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TextToVoice } from "./components/textToVoice.jsx";
import { SpeechToText } from "./components/speechToText.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Login from "./components/Login.jsx";
import { Navbar } from "./components/navigation/Navbar.jsx";
import { Home } from "./components/Home.jsx";
import { Results } from "./components/Results.jsx";
import { Signup } from "./components/Signup.jsx";
import "./App.css";
 
function App() {
  return (
    <UserProvider>
      <Router>
        <div className="main">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/speechToText"
                element={
                  <ProtectedRoute>
                    <SpeechToText />
                  </ProtectedRoute>
                }
              />
              <Route path="/text-to-voice" element={<TextToVoice />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
 
              <Route path="/results" element={<Results/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;