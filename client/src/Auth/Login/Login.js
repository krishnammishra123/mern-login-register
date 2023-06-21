import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { LoginAuth } from '../Services/auth.service';
import { LoginValidate } from '../Validation/Validation';
import React, { lazy, Suspense } from "react";
import "./Login.css";
const Headers = lazy(() => import("../../Page/Headers/Headers"));


function Login()
{
  
    const navigate = useNavigate()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({});

    const handleSubmit =async (evt) => {
        evt.preventDefault();
        const validate = await LoginValidate(email,password);
        setErrors(validate);
        if (Object.keys(validate).length === 0) {
            try {
                 const userdetails = {email, password};
              await LoginAuth(userdetails).then((res) => {
                if (res.user.role === "user") {
                   localStorage.setItem("userToken", res.token);
                   localStorage.setItem("role", res.user.role);
                   setEmail("");
                   setPassword("");
                   navigate("/dashboard");
                }
               }) 
            } catch(err) {
                  console.log(err);
            }
        }
    }
   

    return (
      <>
        <Suspense fallback={<>Loading...</>}>
          <Headers />
        </Suspense>
        <div className="login">
          <h1>Login</h1>
          <p>Please fill in this form to Login an account.</p>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <label>Username : </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              {errors.email && <span>{errors.email}</span>}
              <br></br>
              <label>Password : </label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              {errors.password && <span>{errors.password}</span>}
              <br></br>
              <input type="checkbox" /> Remember me
              <br />
              <br />
              <button type="submit" className="success">
                Login
              </button>
              <br />
              <br />
              Forgot <Link to="/password_reset"> password? </Link>
            </div>
          </form>
        </div>
      </>
    );
}
export default Login;