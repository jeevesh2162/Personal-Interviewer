import React from 'react';
import {results} from '../api/userApi.jsx';

import './results.css';

export const Results = () => {

  const result = new results(JSON.stringify(localStorage.getItem("loggedinuser")));
  const topics = ["React", "Node.js", "MongoDB", "JavaScript", "CSS", "HTML"];

  return (
    
    <div className="results-container">
      <h2 className="title">Available Topics</h2>
      <ul className="topic-list">
        {topics.map((topic, index) => (
          <li key={index} className="topic-item">
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
};
