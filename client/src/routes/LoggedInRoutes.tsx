import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import Auth from '@/pages/Auth';

export default function LoggedInRoutes(): JSX.Element {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Auth />;
}
