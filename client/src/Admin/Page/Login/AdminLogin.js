import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
 
import "./Login.css";
import { LoginAdmin } from "../../Service/Admin.service";
import { adminValidate } from "../../Validation/Validation";
import { LoginContext } from "../../ContextAdmin/ContextAdmin";
 

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const { loginadmin, setLoginAdmin } = useContext(LoginContext);
  console.log(loginadmin);
  const handleSubmit = async (evt) => {
  evt.preventDefault();
  const validate = await adminValidate(email, password);
  setErrors(validate);
  if (Object.keys(validate).length === 0) {
      try {
        const userdetails = { email, password };
        await LoginAdmin(userdetails).then((res) => {
          if (res.user.role === "admin") {
            localStorage.setItem("userToken", res.token);
            localStorage.setItem("role", res.user.role);
            setLoginAdmin(res.user.role);
              setEmail("");
              setPassword("");
            navigate("/admin");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
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
           
          </div>
        </form>
      </div>
    </>
  );
}
export default AdminLogin;
