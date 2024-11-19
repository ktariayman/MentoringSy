import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

function App() {
  return (
    <ThemeProvider
      defaultTheme='dark'
      storageKey='vite-ui-theme'
    >
      <Router>
        <div className='flex flex-col min-h-screen bg-background text-foreground'>
          <main className='flex-1'>
            <Routes>
              <Route
                path='/'
                element={<Auth />}
              />
              <Route
                path='/dashboard'
                element={<Dashboard />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
