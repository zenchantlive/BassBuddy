// LoginForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const LoginForm: React.FC = () => {
  const { token, setToken, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/api/login`, {
        email,
        password,
      });

      setToken(response.data.token);
      router.push('/home');
    } catch (err: any) {
      setAuthError(err?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log In</button>
      {authError && <p>{authError}</p>}
    </form>
  );
};

export default LoginForm;
