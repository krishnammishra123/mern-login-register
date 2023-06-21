import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserHomeAuth } from '../UserService/User.Service';
import { LoginContext } from '../../ContextProvider/Context';
import { lazy, Suspense } from "react";
const Headers2 = lazy(() => import("../Page/Headers2")); 
 

const AdminHome = () => {
  const navigate = useNavigate();  
  const { logindata, setLoginData } = useContext(LoginContext);
  const role = localStorage.getItem("role");
  
    useEffect(() => {
        const VerifyUser = async() => {
            try {
              await UserHomeAuth().then((res) => {
                setLoginData(res.ValidUserOne);
                navigate("/dashboard");
              }).catch((err) => {
               navigate("/login");
               })
            } catch (err) {
                console.log(err);
          }
        }
        VerifyUser();
    },[])

    return (
      <>
        {role === "user" ? (
          <>
            <Suspense fallback={<>Loading...</>}>
              <Headers2 />
            </Suspense>
            <h1 className='mt-5 mb-5'>Welcome To The UserHome Panel </h1>
            <img
              src="../assets/img/user.png"
              alt=""
              style={{ height: "200px", width: "200px" }}
            />
            <h1>Name: {logindata ? logindata.name : ""} </h1>
            <h1> User Email:{logindata ? logindata.email : ""}</h1>
            <h1>Mobile: {logindata ? logindata.mobile : ""} </h1>
          </>
        ) : (
          navigate("/login")
        )}
      </>
    );
}

export default AdminHome