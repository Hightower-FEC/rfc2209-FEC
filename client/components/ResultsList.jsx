import React, {useState, useEffect} from 'react';
import ResultsCard from './ResultsCard.jsx';

const ResultsList = ({results}) => {
  const [currentSlice, setCurrentSlice] = useState(5);
  const [currentResults, setCurrentResults] = useState(results.slice(0, currentSlice));

  const loadResults = () => {
    let newIndex = currentSlice + 5;
    let newResults = results.slice(currentSlice, newIndex);
    let combinedResults = currentResults.concat(newResults);
    setCurrentResults(combinedResults);
    setCurrentSlice(newIndex);
    console.log('combined results', combinedResults, 'new results', newResults);
  };

  useEffect(() => {
    console.log('current results', currentResults);
  }, [currentResults]);

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