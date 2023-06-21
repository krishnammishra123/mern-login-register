import { Link } from "react-router-dom";
import React from "react";
import './Headers.css';
 
 

const Headers = () => {
 
   
 return (
   <>
     <div className="header">
       <Link to="#default" className="logo">
         CompanyLogo
       </Link>
       <div className="header-right">
             <Link className="active" to="/">
               Home
             </Link>
             <Link to="/register">Register</Link>
             <Link to="/login">Login</Link>
       </div>
     </div>
   </>
 );
}

export default Headers














 
  