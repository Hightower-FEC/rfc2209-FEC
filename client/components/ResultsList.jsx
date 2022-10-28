import React, {useState, useEffect} from 'react';
import ResultsCard from './ResultsCard.jsx';

const ResultsList = ({results}) => {
  const [currentSlice, setCurrentSlice] = useState(5);
  const [currentResults, setCurrentResults] = useState(results.slice(0, currentSlice));

  const loadResults = () => {
    let newIndex = currentSlice + 5;
    let newSlice = results.slice(currentSlice, newIndex);
    let combinedResults = currentResults.concat(newSlice);
    setCurrentResults(combinedResults);
    setCurrentSlice(newIndex);
  };

  return (
    <>
      <div className="results">
        {currentResults.map((result, key) => {
          return <ResultsCard result={result} key={key} />;
        })}
      </div>
      <button id="show-more" onClick={() => {
        loadResults();
      }}>Show More Button goes here</button>
    </>
  );
};

export default ResultsList;