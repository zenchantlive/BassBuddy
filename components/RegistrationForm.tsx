import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router'; // Add this line

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken, authError, setAuthError } = useAuth(); // Add this line
  const router = useRouter(); // Add this line

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const backendUrl = 
      process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/api/register`, {
        email,
        password,
      });

      setToken(response.data.token); // Use setToken from AuthContext

      // Redirect the user to the home page (or wherever you want)
      router.push('/home'); // Redirect the user to home page
    } catch (err: any) {
      setAuthError(err?.response?.data?.message || 'An error occurred'); // Use setAuthError from AuthContext
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
      <button type="submit">Register</button>
      {authError && <p>{authError}</p>} // Use authError from AuthContext
    </form>
  );
};

export default RegisterForm;

