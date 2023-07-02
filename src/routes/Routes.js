import { Route, Routes } from "react-router-dom";

import AuthProvider from "../providers/AuthProvider";
import { Redirect } from "react-router-dom";

import Home from "../layouts/Home";
import Admin from "../layouts/Admin";
import Responsable from "../layouts/Advisor";
import Client from "../layouts/Client";
import ForgotPassword from "../common/ForgetPassword";
import Login from "../common/Login";
import Register from "../common/Register";
import ResetPassword from "../common/ResetPassword";
import WelcomePage from "layouts/WelcomePage";
// <Route path="/welcome" element={<WelcomePage />} />

const Pages = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:id/:token"
          element={<ResetPassword />}
        />
        <Route path="/auth/register/:id/:token" element={<Register />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/client/*" element={<Client />} />
        <Route path="/responsable/*" element={<Responsable />} />
        <Route element={<div>404 not found</div>} />
      </Routes>
    </AuthProvider>
  );
};

export default Pages;
