import React, { useContext,useEffect,Suspense,lazy } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../ContextProvider/Context';
import { AdminHomeAuth } from '../Service/Admin.service';
const Headers1 = lazy(() => import("../Page/Headers1"));

const AdminHome = () => {
const navigate = useNavigate();
  const { logindata, setLoginData } = useContext(LoginContext);
 
 
useEffect(() => {
  const VerifyUser = async () => {
    try {
      await AdminHomeAuth().then((res) => {
        setLoginData(res.ValidUserOne);
        console.log("Admin verify successfully");
          navigate("/admin");
        })
        .catch((err) => {
          navigate("/login");
        });
    } catch (err) {
      console.log(err);
    }
  };
  VerifyUser();
}, []);


  return (
    <>
    {logindata.role === "admin" ? (<><Suspense fallback={<>Loading...</>}>
      <Headers1 />
    </Suspense>
    <h1 className='mt-5 mb-5'>Welcome To The AdminHome Panel </h1>
    <img
      src="../assets/img/user.png"
      alt=""
      style={{ height: "200px", width: "200px" }}
    />
    <h1>Name: {logindata ? logindata.name : ""} </h1>
    <h1> User Email:{logindata ? logindata.email : ""}</h1>
    <h1>Mobile: {logindata ? logindata.mobile : ""} </h1>
      </>) : (navigate("/login"))}
      </>
  );
}

export default AdminHome