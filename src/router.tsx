import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './lib/routes';
import { lazy } from 'react';
import NotFoundPage from './pages/not-found';

const HomePage = lazy(() => import('./pages/home'));
const CreatePage = lazy(() => import('./pages/create'));
const ViewPage = lazy(() => import('./pages/view'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.home} replace={true} />,
  },
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: ROUTES.create,
    element: <CreatePage />,
  },
  {
    path: ROUTES.view,
    element: <ViewPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
