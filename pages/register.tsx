import React from 'react';
import RegisterForm from '../components/RegistrationForm';
import Link from 'next/link';

const Register = () => {
  return (
    <div>
      <RegisterForm />
      <p>Already have an account? <Link href="/login"><a>Log in here</a></Link></p>
    </div>
  );
};

export default Register;
