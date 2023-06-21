import { Link } from "react-router-dom";
import React from "react";
import "./Header1.css";
 

const Headers1 = () => {
 
  return (
    <>
      <div className="header">
        <Link to="#default" className="logo">
          CompanyLogo
        </Link>
        <div className="header-right">
          <>
            <Link to="/admin">AdminHome</Link>
            <Link to="/admin/manageuser">Manageusers</Link>
            <Link to="/logoutadmin">Logout</Link>
          </>
        </div>
      </div>
    </>
  );
};

export default Headers1;
