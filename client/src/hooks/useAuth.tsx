import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';

export const useAuthHandler = () => {
  const { isLoading, register, login } = useAuthStore();
  const navigate = useNavigate();

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 🔴 todo : navigate to will be changed based on the user role.
    await login(() => navigate('/dashboard'));
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 🔴 todo : navigate to will be changed based on the user role.
    await register(() => navigate('/dashboard'));
  };

  return { onLogin, onRegister, isLoading };
};
