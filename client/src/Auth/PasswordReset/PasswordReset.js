import React from 'react'
import { useState } from 'react';
import swal from "sweetalert";
import { PasswordResetAuth } from '../Services/auth.service';
import { PasswordResetValidate } from '../Validation/Validation';
import { lazy, Suspense } from "react";
const Headers = lazy(() => import("../../Page/Headers/Headers")); 

const PasswordReset = () => {
  const [email, setEmail] = useState();
  const [errors, setErrors] = useState({});



    const handleSubmit = async(e) => {
      e.preventDefault();
      const validate = await PasswordResetValidate(email);
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        try {
          const userdetails = { email };
          const res = await PasswordResetAuth(userdetails);
          const data = await res.json()
          if (res.status === 400 || !data) {
            swal({ title: "Wrong Entry", text: data.massage, icon: "warning", button: "Ok" });
          } else {
            swal({ title: "Success", text: data.massage, icon: "success", button: "Ok" });
            setEmail("");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Headers />
      </Suspense>
      <div>
        <h1>Enter Your Email</h1>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter Your Email  Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
            <br></br>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PasswordReset;