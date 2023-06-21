import { Link } from "react-router-dom";
import React from "react";
import "./Header2.css";
 

const Headers2 = () => {
 

  return (
    <>
      <div className="header">
        <Link to="#default" className="logo">
          CompanyLogo
        </Link>
        <div className="header-right">
            <Link to="/dashboard">UserHome</Link>
            <Link to="/dashboard/edituser">Edit Profile</Link>
            <Link to="/logout">Logout</Link>
        </div>
      </div>
    </>
  );
};

export default Headers2;
