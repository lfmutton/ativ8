import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timeData, setTimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch('https://apirest-v5hn.onrender.com');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTimeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTime();
    
    // Update every second
    const interval = setInterval(fetchTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App"
    style={{paddingLeft: "32rem"}}>
      <header className="App-header">
        <h1>API Time Display</h1>
        <div className="time-container">
          <h2>Current Time from API:</h2>
          <p className="time">{timeData.date}</p>
          <p className="status">{timeData.status}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
