import axiosInstance from "../../interceptors/interceptors";


export const ImageAuth = async (formData, config) => {
  const res = axiosInstance.post("/upload",formData,config);
    return res;
};