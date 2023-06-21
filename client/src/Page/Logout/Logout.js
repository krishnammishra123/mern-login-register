import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../ContextProvider/Context";
import axios from 'axios';
 
const Logout = () => {
  const navigate = useNavigate();
  const { setLoginData } = useContext(LoginContext);


  const logoutData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.get("http://localhost:3001/logout", {
          headers: { "Authorization": token },
        }).then((res) => {
          if (res.status === 200) {
            console.log(res.data.massage);
            console.log("User logout");
            localStorage.removeItem("userToken");
            localStorage.removeItem("role");
            setLoginData(false);
            navigate("/login");
          }
        }).catch((err) => {
          console.log(err);
        });  
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    logoutData();
  }, [])
  
  return (<div>Logging out... </div>);
};
export default Logout;

 
