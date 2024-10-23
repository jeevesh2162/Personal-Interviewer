
// NO NEED OF THIS NOW

import React, { useRef } from 'react';
// import './style.css';

export const TextToVoice = () => {
    const speech = new SpeechSynthesisUtterance();
    const textareaRef = useRef(null);

    const startSpeaking = () => {
        if (textareaRef.current) {
            speech.text = textareaRef.current.value;
            window.speechSynthesis.speak(speech);
        }
    };

    return (
        <div>
            <h1>Speech to Text Converter</h1>
            <br/>
            <p>React hook to convert the speech</p>
            <textarea className="main-content" ref={textareaRef} defaultValue="hello how are you."></textarea>
            <div className="btn-style">
                <button>Copy</button>
                <button onClick={startSpeaking}>Start Speaking</button>
                {/* <button onClick={SpeechRecognition.stopListening}>Stop Listening</button> */}
            </div>
        </div>
    );
};
