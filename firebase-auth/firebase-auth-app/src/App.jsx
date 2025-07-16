// src/App.jsx
import { useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AuthStatus from './components/AuthStatus';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      <h1>Firebase Auth with Vite</h1>
      <AuthStatus />
      {showSignUp ? <SignUp /> : <SignIn />}
      <button onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
      </button>
    </div>
  );
}

export default App;