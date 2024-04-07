import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      {
        path: 'add',
        element: <Suspense fallback={'Loading...'}>ФФФ</Suspense>,
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
