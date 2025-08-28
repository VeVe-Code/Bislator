import React, { useContext } from "react";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import AdminLayout from "../adminlayouts.jsx";
import AdminService from "../pages/admin/adminservices.jsx";
import ServiceForm from "../pages/admin/serviceform.jsx";
import RegisterForm from "../pages/admin/regitser.jsx";
import LoginForm from "../pages/admin/login.jsx";
import AdminNews from "../pages/admin/adminnews.jsx";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext.jsx";
import NewsForm from "../pages/admin/newsform.jsx";
import Services from "../pages/services.jsx";
import Dailynews from "../pages/Dailynews.jsx";
import ContactUs from "../pages/Contactus.jsx";
import AboutUs from "../pages/Aboutus.jsx";
import AdminContactUs from "../pages/admin/admincontactus.jsx";
import NewsDetail from "../pages/newsdetail.jsx";
import AdminNewsDetail from "../pages/admin/adminnewsdetail.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

function IndexRoutes() {
  const { admin } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/services", element: <Services /> },
        { path: "/Dailynews", element: <Dailynews /> },
        { path: "/Contact-us", element: <ContactUs /> },
        { path: "/About-us", element: <AboutUs /> },
        { path: "/Newsdetail/:id", element: <NewsDetail /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "service", element: admin ? <AdminService /> : <Navigate to="/admin/login" /> },
        { path: "service/create", element: admin ? <ServiceForm /> : <Navigate to="/admin/login" /> },
        { path: "service/edit/:id", element: admin ? <ServiceForm /> : <Navigate to="/admin/login" /> },
        { path: "register", element: !admin ? <RegisterForm /> : <Navigate to="/admin/service" /> },
        { path: "login", element: !admin ? <LoginForm /> : <Navigate to="/admin/service" /> },
        { path: "news", element: admin ? <AdminNews /> : <Navigate to="/admin/login" /> },
        { path: "news/create", element: admin ? <NewsForm /> : <Navigate to="/admin/login" /> },
        { path: "news/edit/:id", element: admin ? <NewsForm /> : <Navigate to="/admin/login" /> },
        { path: "adminContactUs", element: admin ? <AdminContactUs /> : <Navigate to="/admin/login" /> },
        { path: "news/NewsDetails/:id", element: admin ? <AdminNewsDetail /> : <Navigate to="/admin/login" /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default function Index() {
  return (
    <AuthContextProvider>
      <IndexRoutes />
    </AuthContextProvider>
  );
}
