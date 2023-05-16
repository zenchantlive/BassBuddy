import React from 'react';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';

const Login = () => {
  return (
    <div>
      <LoginForm />
      <p>Don't have an account? <Link href="/register"><a>Register here</a></Link></p>
    </div>
  );
};

export default Login;
