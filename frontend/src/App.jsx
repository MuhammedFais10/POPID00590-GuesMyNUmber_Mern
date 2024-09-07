// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [predictedNumber, setPredictedNumber] = useState('');
  const [result, setResult] = useState(null);

  const guessNumber = async () => {
    const response = await axios.post('http://localhost:5000/guess', {
      predictedNumber: parseInt(predictedNumber, 10),
    });
    setResult(response.data.result);
  };

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <input
        type="number"
        placeholder="Enter your guess"
        value={predictedNumber}
        onChange={(e) => setPredictedNumber(e.target.value)}
      />
      <button onClick={guessNumber}>Guess</button>
      {result && (
        <div>
          <h2>{result === 'Win' ? 'Congratulations! You guessed the correct number!' : 'Sorry, try again!'}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
