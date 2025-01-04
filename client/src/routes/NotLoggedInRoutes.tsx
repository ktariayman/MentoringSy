import { useAuthStore } from '@/features/Auth/store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';

export default function NotLoggedInRoutes(): JSX.Element {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}
