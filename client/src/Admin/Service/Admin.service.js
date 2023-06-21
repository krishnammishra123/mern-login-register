import axiosInstance from "../../interceptors/interceptors";



//Login Auth service
export const LoginAdmin = async (userdetails) => {
  const res = await axiosInstance.post("/login", userdetails);
  return res;
};


//adminHome verify
export const AdminHomeAuth = async () => {
  const res =await axiosInstance.get("/admin/validuser");
  return res;
};

export const updateService = async (userdetail, id) => {
  const res = await axiosInstance.post(`/admin/updateuser/${id}`, userdetail);
  return res;
};

export const manageData = async () => {
  const res =await axiosInstance.get("/admin/manageuser");
  return res;
};

export const deleteUsers = async (id) => {
  const res = await axiosInstance.delete(`/admin/delete/${id}`);
  return res;
};

export const editService = async (id) => {
  const res = await axiosInstance.get(`/admin/editadmin/${id}`);
  return res;
};


export const findUser = async (search,sort,page) => {
  const res = await axiosInstance.get(`/admin/finduser?search=${search}&sort=${sort}&page=${page}`, "");
  return res;
};


