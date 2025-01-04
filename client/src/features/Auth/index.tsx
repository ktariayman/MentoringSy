import { Header } from '@/components/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/features/Auth/forms/LoginForm';
import RegisterForm from '@/features/Auth/forms/RegisterForm';

export default function Auth() {
  return (
    <>
      <Header
        isLoggedIn={false}
        title="Auth"
        onLogin={() => {}}
        onLogout={() => {}}
      />
      <div
        style={{ background: 'hsl(var(--background-light))' }}
        className="w-100 flex items-center justify-center min-h-screen bg-gray-100"
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Login or create an account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
