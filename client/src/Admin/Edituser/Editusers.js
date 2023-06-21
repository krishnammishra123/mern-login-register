import { useState, useEffect, useContext } from "react";
import "./Edituser.css";
import { LoginContext } from "../../ContextProvider/Context";
// import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { editService, updateService } from "../Service/Admin.service";
import { toast } from "react-toastify";
const Headers1 = lazy(() => import("../Page/Headers1"));

const Editusers = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const navigate = useNavigate();
  const { setLoginData } = useContext(LoginContext);
  const role = localStorage.getItem("role");
  const {id} = useParams();
   
  const editAdmin = async() => {
    try {
      await editService(id)
        .then((res) => {
          setName(res.massage.name);
          setEmail(res.massage.email);
          setMobile(res.massage.mobile);
          setLoginData(true);
        }).catch((err) => {
          navigate("/login");
        });
    }catch(err) {
      console.log(err);
    }
  };
  useEffect(() => {
    editAdmin();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userdetail = { name, mobile }
      await updateService(userdetail, id).then((res) => {
        navigate("/admin/manageuser");
        toast.success(res.massage, { position: toast.POSITION.TOP_RIGHT,});
      })
    } catch (err) {
      console.log(err);
    } 
  };

  return (
    <>
      {role === "admin" ? (
        <>
          <Suspense fallback={<>Loading...</>}>
            <Headers1 />
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
        </>
      ) : (
        navigate("/login")
      )}
    </>
  );
};
export default Editusers;
