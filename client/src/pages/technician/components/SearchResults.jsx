import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

function HiddenResults() {
  return (


    <div id="searchResults" className='flex row'>
      <div className="result-item">Result 1</div>
      <div className="result-item">Result 2</div>
      <div className="result-item">Result 3</div>
      <div className="result-item hidden">Result 4</div>
      <div className="result-item hidden">Result 5</div>
    </div>
  );
}

export default function SearchResults() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const hiddenResults = document.querySelectorAll('.result-item.hidden');

    const handleNext = () => {
      const resultsToShow = 5;
      let newIndex = currentIndex;

      for (let i = 0; i < resultsToShow; i++) {
        if (newIndex < hiddenResults.length) {
          hiddenResults[newIndex].classList.remove('hidden');
          newIndex++;
        } else {
          break;
        }
      }

      setCurrentIndex(newIndex);
    };

    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', handleNext);

    return () => {
      nextButton.removeEventListener('click', handleNext);
    };
  }, [currentIndex]);

  return (
    <div>
      <HiddenResults />
      <button id="nextButton">Next</button>
    </div>
  );
}
