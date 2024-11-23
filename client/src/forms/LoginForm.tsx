import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthHandler } from '@/hooks/useAuth';

export const LoginForm = () => {
  const { isLoading, onLogin } = useAuthHandler();
  return (
    <form onSubmit={onLogin}>
      <div className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='login-email'>Email</Label>
          <Input
            id='login-email'
            type='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='login-password'>Password</Label>
          <Input
            id='login-password'
            type='password'
            placeholder='Enter your password'
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
