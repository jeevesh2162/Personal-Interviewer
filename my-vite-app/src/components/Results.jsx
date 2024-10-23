import React from 'react';
import './results.css';

export const Results = () => {
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
