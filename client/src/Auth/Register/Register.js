import './Register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { RegisterAuth } from "../Services/auth.service";
import { RegistrationValidate } from "../Validation/Validation";
import React, { lazy, Suspense } from "react";
const Headers = lazy(() => import("../../Page/Headers/Headers"));

const Register = () => {
   const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await RegistrationValidate(name, email, password, mobile);
    setErrors(validate);
    if (Object.keys(validate).length === 0) {
      try {
        const userdetails = { name, email, password, mobile };
        await RegisterAuth(userdetails).then((res) => {
          swal({ title: "Success", text: res.data.massage, icon: "success", button: "Ok" });
          navigate("/login");
          setName("");
          setEmail("");
          setPassword("");
          setMobile("");
        }).catch ((err) => {
          if (err.response.status === 400) {
             swal({title: "Wrong Entry", text: err.response.data.massage,  icon: "warning", button: "Ok"});
          } else if (err.response.status === 409) {
              swal({title: "Wrong Entry", text: err.response.data.massage,  icon: "warning", button: "Ok"});
          } else {
             swal({title: "Wrong Entry", text: err.response.data.massage,  icon: "warning", button: "Ok"});
          }
        })
      } catch (err) {
        console.log(err);
      }
      } 
  };

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Headers />
      </Suspense>
      <div className="register">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>

        <form onSubmit={handleSubmit}>
          <div className="container">
            <hr />
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span>{errors.name}</span>}
            <br />
            <br />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
            <br />
            <br />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span>{errors.password}</span>}
            <br />
            <br />

            <label htmlFor="psw-repeat">
              <b>Mobile</b>
            </label>
            <input
              type="text"
              placeholder="Repeat Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && <span>{errors.mobile}</span>}
            <br />
            <br />
            <hr />

            <button type="submit" className="registerbtn">
              Register
            </button>
          </div>

          <div className="container signin">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>.
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
export default Register;