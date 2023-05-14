import React, { useState } from 'react';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        email,
        password,
      });

      // Save the JWT in local storage
      localStorage.setItem('token', response.data.token);

      // Redirect the user to the home page (or wherever you want)
      // Use Next.js's useRouter hook for this
    } catch (err: any) {
      setError(err?.response?.data?.message || 'An error occurred');
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
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
