import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
      try {
          const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', { name, email }, { withCredentials: true });
          if (response.status === 200) {
              window.location.href = '/search';
          }
      } catch (error) {
          console.error('Login failed', error);
      }
  };

  return (
      <form onSubmit={handleLogin}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Login</button>
      </form>
  );
}

export default Login
