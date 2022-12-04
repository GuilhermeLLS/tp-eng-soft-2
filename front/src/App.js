import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth/useAuth';

const UnauthenticatedApp = lazy(() => import('./pages/index/UnauthenticatedApp'));

const AuthenticatedApp = lazy(() => import('./pages/index/AuthenticatedApp'));

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<p>loading...</p>}>
        {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
