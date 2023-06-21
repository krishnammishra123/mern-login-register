import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import swal from "sweetalert";
import { ForgotPasswordValidate } from '../Validation/Validation';
import { ForgotAuth, ForgotPasswordAuth } from '../Services/auth.service';
import { lazy, Suspense } from "react";
const Headers = lazy(() => import("../../Page/Headers/Headers"));

const ForgotPassword = () => {

const navigate = useNavigate();
const { id, token } = useParams();
const [password, setPasaword] = useState();
const [errors, setErrors] = useState({});
  


 
  useEffect(() => {
    const userValid = async () => {
      try {
        const res = await ForgotAuth(id,token);
        const data = await res.json();
        if (res.status === 400 || !data) {
          navigate("/login");
        } else {
          console.log("user valid");
        }
      } catch (err) {
        console.log(err);
      }
    };
    userValid();
  }, []);


  const handlesubmit = async (e) => {
    e.preventDefault();
    const validate = await ForgotPasswordValidate(password);
    setErrors(validate);
    if (Object.keys(validate).length === 0) {
      try {
        const userdetails = {password };
        const res = await ForgotPasswordAuth(userdetails,id,token);
        const data = await res.json();
        if (res.status === 400 || !data) {
          swal({ title: "Wrong Entry", text: data.massage, icon: "warning", button: "Ok" });
        } else {
         swal({ title: "Success", text: data.massage, icon: "success", button: "Ok" });
          setPasaword('');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <Headers />
      </Suspense>
      <h1>Enter Your New Password</h1>

      <form onSubmit={handlesubmit}>
        <div className="container">
          <label htmlFor="psw">
            <b>New Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Your New Password"
            value={password}
            onChange={(e) => setPasaword(e.target.value)}
          />
          {errors.password && <span>{errors.password}</span>}
          <br></br>
          <button type="submit" className="registerbtn">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword