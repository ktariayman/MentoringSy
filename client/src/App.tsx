import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import Dashboard from './pages/Dashboard';
import Auth from './features/Auth';
import BrowseMentor from './features/Mentors/BrowseMentor';
import MenteeDashboard from './pages/Mentee';
import MentorProfile from './pages/MentorProfile';
import BrowseMentee from './pages/BrowseMentee';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NotLoggedInRoutes />,
      children: [
        {
          path: '/',
          element: <Auth />
        }
      ]
    },
    {
      path: '/',
      element: <LoggedInRoutes />,
      children: [
        {
          path: '/',
          element: <Dashboard />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/mentees',
          element: <MenteeDashboard />
        },
        {
          path: '/browse/mentors',
          element: <BrowseMentor />
        },
        {
          path: '/browse/mentees',
          element: <BrowseMentee />
        },
        {
          path: '/mentors/:id',
          element: <MentorProfile />
        },
        {
          path: '/mentees/:id',
          element: <MentorProfile />
        }
      ]
    }
  ]);

  return (
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vite-ui-theme'
    >
      <div className='flex flex-col min-h-screen bg-background text-foreground'>
        <main className='flex-1'>
          <RouterProvider router={router} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
