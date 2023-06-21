const express = require("express");
const { register, login , sendpasswordlink, forgotpassword, changePassword ,ImageData, logout } = require("../controller/IndexController");
const dataupload = require("../model/UploadModel");
const multer = require("multer");
const authenticate = require("../middleware/authenticate");
 
 
 
const router=express.Router();

//store Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // The name of the file
  },
});
const SaveFile = multer({ storage: storage });

//user Registration
router.post("/register",register);
//User Login
router.post("/login",login);

//send Email Link for Reset password
router.post("/sendpasswordlink",sendpasswordlink);

//verify user for forgot password time
router.get("/forgotpassword/:id/:token", forgotpassword);

//change Password
router.post("/:id/:token", changePassword);

//image upload
router.post("/upload", SaveFile.single("file"), ImageData);


//user Logout
router.get("/logout",authenticate,logout);

 
module.exports=router;



 