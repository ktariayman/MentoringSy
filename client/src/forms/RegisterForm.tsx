import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthHandler } from '@/hooks/useAuth';

const RegisterForm = () => {
  const { isLoading, register } = useAuthHandler();
  return (
    <form onSubmit={register}>
      <div className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='register-name'>Name</Label>
          <Input
            id='register-name'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='register-email'>Email</Label>
          <Input
            id='register-email'
            type='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='register-password'>Password</Label>
          <Input
            id='register-password'
            type='password'
            placeholder='Choose a password'
            required
          />
        </div>
      </div>
      <Button
        className='w-full mt-6'
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
