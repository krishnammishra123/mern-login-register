import { useRef, useState } from "react";
import swal from "sweetalert";
import "./UploadFile.css";
import { ImageAuth } from "../Service/Page.service";
import { UploadValidate } from "../../Auth/Validation/Validation";
 
 

  const UploadFile = () => {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = await UploadValidate(name,file);
    setErrors(validate);
    if (Object.keys(validate).length === 0) {
    try {
      const formData = new FormData();
      formData.append("name",name);
      formData.append("file",file);
      const config = {
        headers: {
          "Content-Type":"multipart/form-data",
        },
      };
      await ImageAuth(formData,config).then((res) => {
        swal({title:"Success",text: res.massage,icon:"success",button: "Ok"});
        setName("");
        setFile("");
        fileInputRef.current.value = "";
      }) 
    } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <h1>Upload Image</h1>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <hr />
          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span>{errors.name}</span>}
          <br />
          <br />

          <label htmlFor="file">
            <b>File</b>
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {errors.file && <span>{errors.file}</span>}
          <br />
          <br />
          <hr />

          <button type="submit" className="registerbtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default UploadFile;

 