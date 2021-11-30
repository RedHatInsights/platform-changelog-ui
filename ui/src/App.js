import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setstatus] = useState("loading status...");

  useEffect(() => {
    fetch('/status').then(res => res.json()).then(data => {
      setstatus(data.status);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>status: {status}</p>
      </header>
    </div>
  );
}

export default App;