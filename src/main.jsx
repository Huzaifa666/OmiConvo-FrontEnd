import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@pages/landing/login/index.jsx';
import Registration from '@pages/landing/registration/index.jsx';
import Verify from '@pages/landing/verify/index.jsx';
import Privacy from '@pages/landing/privacy/index.jsx';
import Terms from '@pages/landing/terms/index.jsx';
import Error404 from '@pages/landing/404/index.jsx';
import {
  AuthProvider,
  LoginHandler,
  ProtectedRoute,
} from '@/context/auth/authContext.jsx';
import MainAppShell from '@pages/appShell.jsx';
import Home from '@pages/home.jsx';
import Marketing from '@pages/marketing.jsx';
import Subscribers from '@pages/subscribers.jsx';
import Channels from '@pages/channels/catalog/index.jsx';
import ChannelOnboarding from '@pages/channels/onboarding/index.jsx';
import ChannelStatus from '@pages/channels/status/index.jsx';
import Onboarding from './pages/landing/onboarding/index.jsx';
import { Loader } from '@components/loader.jsx';
import { Instagram } from '@pages/instagram/index.jsx';
import '@mantine/carousel/styles.css';

const Chat = lazy(() => import('./pages/chat'));

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

const router = createBrowserRouter([
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <MainAppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'inbox',
        element: (
          <Suspense fallback={<Loader />}>
            <Chat />
          </Suspense>
        ),
      },
      {
        path: 'marketing',
        element: <Marketing />,
      },
      {
        path: 'subscribers',
        element: <Subscribers />,
      },
      // We need to shift Channels children
      {
        path: 'channels',
        element: <Channels />,
      },
      {
        path: 'channels/:app/onboarding',
        element: <ChannelOnboarding />,
      },
      {
        path: 'channels/:app/status',
        element: <ChannelStatus />,
      },
    ],
  },
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <LoginHandler>
        <Login />
      </LoginHandler>
    ),
  },
  {
    path: '/instagram',
    element: (
      <ProtectedRoute>
        <Instagram />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: (
      <LoginHandler>
        <Login />
      </LoginHandler>
    ),
  },
  {
    path: '/signup',
    element: <Registration />,
  },
  {
    path: '/verify',
    element: <Verify />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </MantineProvider>,
);
