// src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await axios.post('/login', { email, password });
    // Save the token to local storage
    localStorage.setItem('token', res.data.token);
  };

  return (
    <form onSubmit={login}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required title="Enter your email address" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required title="Enter your password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
