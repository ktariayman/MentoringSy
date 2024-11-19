import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthHandler = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise(() =>
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000)
    );
    setIsLoading(false);
  };

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise(() =>
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000)
    );
    setIsLoading(false);
  };

  return { login, register, isLoading };
};
