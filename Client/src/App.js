import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email_address: email,
        password: password,
      });

      console.log('Login successful:', response.data);
      // Optionally, you can store the token in state or a global state management solution

      // Redirect to a different page or perform other actions on successful login
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default App;
