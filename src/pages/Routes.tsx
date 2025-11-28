import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { SavingsCalculatorPage } from './SavingsCalculatorPage';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SavingsCalculatorPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]);

export function Routes() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  );
}
