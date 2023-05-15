import React from 'react';
import { useRouter } from 'next/router';
import { getToken } from '../helpers/auth'; // Adjust the path according to your file structure

interface WithAuthProps {
  // Define the props that will be passed to the wrapped component
  // For example:
  someProp: string;
}

const withAuth = (WrappedComponent: React.ElementType<WithAuthProps>) => {
  return (props: WithAuthProps) => {
    // check if there is a token in the localStorage
    const token = getToken();

    // using the next/router hook
    const router = useRouter();

    // if there's no token, redirect to login page
    if (!token) {
      router.push('/login');
      return null;
    }

    // if there's a token, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

