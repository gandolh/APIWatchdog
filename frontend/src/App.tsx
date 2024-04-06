import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './components/shared/MainLayout';
import ErrorPage from './components/shared/ErrorPage';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthProvider } from './components/auth/AuthContext';

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  }
]);



export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  )
} 