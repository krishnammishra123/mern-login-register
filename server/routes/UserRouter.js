const express = require("express");
const { validuser, editprofile } = require("../controller/UserController");
const authenticate = require("../middleware/authenticate");
const verifyUser = require("../middleware/authenticate");

const router = express.Router();
//token varification
router.get("/validuser", verifyUser, validuser);

//get edituser as well as verify
router.put("/editprofile", verifyUser, editprofile);
 
module.exports = router;
