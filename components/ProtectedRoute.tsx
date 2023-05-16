// ProtectedRoute.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component }: { component: any }) => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  if (!token) {
    return null; // or a loading spinner, if you prefer
  }

  return <Component />;
};

export default ProtectedRoute;
