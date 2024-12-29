import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/Auth/store/auth.store';
import Auth from '@/features/Auth';

export default function LoggedInRoutes(): JSX.Element {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Auth />;
}
