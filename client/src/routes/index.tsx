import NotFound from '@/pages/shared/not-found';
import { Suspense, lazy } from 'react';
import { Link, Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

import AdminSignInPage from '@/pages/shared/auth/signin';
import PrivateRoute from './private-routes';
import VehiclePage from '@/pages/admin/vehicle';
import AdminSignupPage from '@/pages/shared/auth/signup';

const DashboardPage = lazy(() => import('@/pages/admin/dashboard'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'vehicles',
          element: <VehiclePage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/admin/signin',
      element: <AdminSignInPage />,
      index: true
    },
    {
      path: '/admin/signup',
      element: <AdminSignupPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
