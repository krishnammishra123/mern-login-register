 import axiosInstance from '../../interceptors/interceptors';
 
 

//adminHome verify
export const UserHomeAuth = async () => {
  const res =await axiosInstance.get("/user/validuser");
  return res;
};

 
//userHome verify
export const EditOneAuth = async (token) => {
   const res = axiosInstance.get("/user/validuser");
  return res;
};

//Update User verify
export const UpdateUser = async (UserUpdate) => {
   const res = axiosInstance.put("/user/editprofile", UserUpdate);
  return res;
};
