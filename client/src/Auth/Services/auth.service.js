import React from 'react';
import axios from 'axios';
import axiosInstance from '../../interceptors/interceptors';
 
const API_URL = "http://localhost:3001";

 
//Register Auth service
export const RegisterAuth = async (userdetails) => { 
  const res = await axios.post(`${API_URL}/register`, userdetails);
  return res;
}

//Login Auth service
export const LoginAuth = async (userdetails) => {
  const res = await axiosInstance.post("/login", userdetails);
  return res;
};



//Password Reset Auth Service
export const PasswordResetAuth = async (userdetails) => {
  const res = await fetch(`${API_URL}/sendpasswordlink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdetails),
  });
  return res;
};


//forgotpassword Validation
export const ForgotAuth = async(id,token) => {
  const res = await fetch(`${API_URL}/forgotpassword/${id}/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//forgotpassword Auth service
export const ForgotPasswordAuth =async (userdetails,id,token) => {
      const res = await fetch(`${API_URL}/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdetails),
      });
  return res;
}




 