import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/user/Home";
import About from "./pages/user/About";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isAdminRout = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRout && <Header />}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
