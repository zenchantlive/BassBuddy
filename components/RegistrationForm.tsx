import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await axios.post('/register', { email, password });
    // Save the token to local storage
    localStorage.setItem('token', res.data.token);
  };

  return (
    <form onSubmit={register}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email address" title="Email address" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" title="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
