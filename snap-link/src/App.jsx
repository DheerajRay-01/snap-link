import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axiosInstance from "./utils/axios.js";
import { user } from "./utils/demo.js";
// import { Navigate } from 'react-router'
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RedirectURL from "./components/pageComponents/RedirectURL.jsx";
import ProjectedUrlPage from "./pages/ProjectedUrlPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Layout from "./pages/Layout.jsx";
import MyLinksPage from "./pages/MyLinksPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
// import axiosInstance from './utils/axios.js';
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/redux/userSlice.js";
import { fetchAllLinks } from "./utils/redux/myLinksSlice.js";
import MyQrPage from "./pages/MyQrPage.jsx";
import { fetchAllQr } from "./utils/redux/qrSlice.js";
import LogOutPage from "./pages/LogOutPage.jsx";
// import "@fontsource-variable/caveat";
import PublicRoutes from "./utils/secureRoutes/PublicRoutes.jsx";
import ProtectedRoutes from "./utils/secureRoutes/ProtectedRoutes.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const linkLimit = useSelector((state) => state?.links?.limit);
  const qrLimit = useSelector((state) => state?.qr?.limit);

  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const [userRes, linksRes, qrRes] = await Promise.all([
      axiosInstance.get(`/user/current-user`),
      axiosInstance.get(`/links/my-links?p=0&l=${linkLimit}`),
      axiosInstance.get(`/links/all-qr?p=0&l=${qrLimit}`),
    ]);

    // User
    const userData = userRes?.data?.data;
    if (userData) {
      dispatch(addUser(userData));
    }

    // Links
    const links = linksRes?.data?.data?.links || [];
    dispatch(fetchAllLinks(links));

    // QR
    const qr = qrRes?.data?.data?.allQr || [];
    dispatch(fetchAllQr(qr));
  } catch (error) {
    console.error("App init failed:", error);
  } finally {
    setLoading(false);
  }
};
 useEffect(() => {
  if (!user) {
    fetchData()
  }
}, [user, dispatch]);

let isAuthenticated = !!user

  console.log(isAuthenticated);

  return (
    <>
 <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      
      {/* Public Pages (blocked if logged in) */}
      <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
        <Route path="intro" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Protected Pages (requires login) */}
      <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
        <Route path="my-links" element={<MyLinksPage />} />
        <Route path="qr-codes" element={<MyQrPage />} />
        <Route path="logout" element={<LogOutPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>

      {/* Common Pages (anyone can access) */}
      <Route path="error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route index element={<HomePage />} />
    </Route>
      <Route path=":id" element={<RedirectURL />} />
      <Route path="protected/:id" element={<ProjectedUrlPage />} />
  </Routes>
</BrowserRouter>



    </>
  );
}

export default App;
