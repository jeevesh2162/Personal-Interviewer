// Results.js
import React, { useEffect, useState } from "react";
import { results } from "../api/userApi.jsx";
import { Link } from "react-router-dom";
import "./results.css";

export const Results = () => {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const fetchedTopics = await results();
      setTopics(fetchedTopics);
    };
    fetch();
  }, []);

  return (
    <div className="results-container">
      <h2 className="title">Available Topics</h2>
      <ul className="topic-list">
        {Object.keys(topics).length > 0
          ? Object.entries(topics).map(([key, topic]) => (
              <li key={key} className="topic-item">
                <Link
                  to={`/results/${topic.topic}`} // Route path to display detailed information
                  state={{ topic }} // Pass the `topic` data as state here
                  className="redirect-link"
                >
                  {topic.topic}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
