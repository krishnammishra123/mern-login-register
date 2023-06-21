  import { useState, useEffect,  useContext } from "react";
  import './EditAccount.css';
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";
  import { lazy, Suspense } from "react";
  import { EditOneAuth, UpdateUser } from "../UserService/User.Service";
  import { LoginContext } from "../../ContextProvider/Context";
  const Headers2 = lazy(() => import("../Page/Headers2")); 



  const EditAccount = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const navigate = useNavigate();
 
    const { setLoginData } = useContext(LoginContext);
      const role = localStorage.getItem("role");
      
    useEffect(() => {
      const VerifyUser = async () => {
        try {
          await EditOneAuth().then((res) => {
              console.log("Edit  Page  Verify");
              setLoginData(true);
              setName(res.ValidUserOne.name);
              setEmail(res.ValidUserOne.email);
              setMobile(res.ValidUserOne.mobile);
          }).catch((err) => {
            navigate("/login");
            })
        } catch (err) {
          console.log(err);
        }
      };
      VerifyUser();
    }, []);

   
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const UserUpdate = { name, mobile };
          await UpdateUser(UserUpdate).then((res) => {
            console.log("Edit Profile  Successfull");
              toast.success( res.massage,{
                position: toast.POSITION.TOP_RIGHT,
              });
              setLoginData(true);
          })
      } catch (err) {
        console.log(err);
      }
    };

    return (<>
     {role === "user" ? <>
        <Suspense fallback={<>Loading...</>}>
          <Headers2 />
        </Suspense>
        <div className="register">
          <h1>Edit Profile</h1>

          <form onSubmit={handleSubmit}>
            <div className="container">
              <hr />
              <label htmlFor="name">
                <b>Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                disabled
              />

              <label htmlFor="psw-repeat">
                <b>Mobile</b>
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Repeat Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <hr />
              <button type="submit" className="registerbtn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </> :(navigate("/login"))}</>
    );
  };
  
export default EditAccount
  