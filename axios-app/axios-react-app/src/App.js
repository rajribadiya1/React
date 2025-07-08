import React from 'react';
import './App.css';
import Posts from './components/posts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Axios Example</h1>
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;