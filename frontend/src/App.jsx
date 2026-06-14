import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import { ToastProvider } from './context/ToastContext';
import ToastNotification from './components/ui/ToastNotification';

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <ToastNotification />
        </ToastProvider>
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
