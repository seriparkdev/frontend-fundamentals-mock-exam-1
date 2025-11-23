import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { StatusHandlingBoundary } from 'components/common/StatusHandlingBoundary';
import { SavingsCalculatorPage } from './SavingsCalculatorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <StatusHandlingBoundary>
        <SavingsCalculatorPage />
      </StatusHandlingBoundary>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
