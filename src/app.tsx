import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Feed from "./pages/Feed";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "signup", element: <GuestRoute><Signup /></GuestRoute> },
          { path: "signin", element: <GuestRoute><Signin /></GuestRoute> },
          { path: "change-password", element: <ProtectedRoute><ChangePassword /></ProtectedRoute> },
        ],
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Feed /> },
          { path: "posts/:id", element: <PostDetails /> },
          { path: "profile", element: <Profile /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}