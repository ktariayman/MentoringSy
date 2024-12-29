import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthHandler } from '@/features/Auth/hooks/useAuth';

export const LoginForm = () => {
  const { isLoading, onLogin } = useAuthHandler();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={onLogin}>
      <div className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='login-email'>Email</Label>
          <Input
            id='login-email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='login-password'>Password</Label>
          <Input
            id='login-password'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button
        className='w-full mt-6'
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
