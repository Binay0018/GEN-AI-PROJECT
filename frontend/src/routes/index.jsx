import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import LegacyInterviewRedirect from './LegacyInterviewRedirect';

import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import ReportPage from '../pages/ReportPage';
import ResumePreviewPage from '../pages/ResumePreviewPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export const router = createBrowserRouter([
  {
    element: <MainLayout transparentNav />,
    children: [
      { path: '/', element: <LandingPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/report/:interviewId', element: <ReportPage /> },
      { path: '/resume/:interviewId', element: <ResumePreviewPage /> },
    ],
  },
  {
    path: '/interview/:interviewId',
    element: <LegacyInterviewRedirect />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
