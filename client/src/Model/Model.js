import React from 'react'
import { Routes, Route   } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer  } from "react-toastify";
 
 
const LogoutAdmin = lazy(() => import("../Admin/Page/Logout/LogoutAdmin"));
const Logout = lazy(() => import("../Page/Logout/Logout"));
const Error = lazy(() => import("../Page/Error/Error"));
const Login = lazy(() => import("../Auth/Login/Login"));
const Register = lazy(() => import("../Auth/Register/Register.js"));
const Home = lazy(() => import("../Page/Home/Home"));
const AdminHome = lazy(() => import("../Admin/Dashboard/AdminHome"));
const AdminLogin = lazy(() => import("../Admin/Page/Login/AdminLogin"));
const Manageusers = lazy(() => import("../Admin/Manageusers/Manageusers"));
const Editusers = lazy(() => import("../Admin/Edituser/Editusers"));
const UserDetails = lazy(() => import("../User/UserDetails/UserDetails"));
const PasswordReset = lazy(() => import("../Auth/PasswordReset/PasswordReset"));
const ForgotPassword = lazy(() => import("../Auth/ForgotPassword/ForgotPassword"));
const EditAccount = lazy(() => import("../User/EditAccount/EditAccount"));
const UploadFile = lazy(() => import("../Page/UploadFile/UploadFile"));
 

const Model = () => {
   

  return (
    <div>
      <ToastContainer />
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="*" element={<Error />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/upload" element={<UploadFile />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/password_reset" element={<PasswordReset />}></Route>
          <Route path="/forgot_password/:id/:token"element={<ForgotPassword />} ></Route>
          <Route path="/dashboard" element={<UserDetails />}></Route> 
          <Route path="/dashboard/edituser" element={<EditAccount />}></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route> 
          <Route path="/admin" element={<AdminHome />}></Route> 
          <Route path="/admin/manageuser" element={<Manageusers />}></Route> 
          <Route path="/admin/edit/:id" element={<Editusers />}></Route> 
          <Route path="/logoutadmin" element={<LogoutAdmin />}></Route> 
        </Routes>
      </Suspense>
    </div>
  );
}

export default Model