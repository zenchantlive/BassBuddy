// components/ProtectedRoute.tsx
import { FC, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  component: ComponentType;
  [props: string]: any;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component, ...props }) => {
  const { token } = useAuth();
  const router = useRouter();

  if (!token) {
    // If there's no token, redirect to the login page
    router.push('/login');
    return null;
  }

  // If there's a token, render the component
  return <Component {...props} />;
};

export default ProtectedRoute;
