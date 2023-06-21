 const User = require("../model/UserModel");


//verify user for  user
const validuser = async(req,res) => {
  try {
   return res.status(200).json({ ValidUserOne: req.rootuser });
  }catch(err){
  return res.status(500).json({ massage: "Something is Wrong"});
  }
};


const editprofile = async (req, res) => {
  const { name, mobile } = req.body;
  try {
    const EditUserOne = await User.findByIdAndUpdate(req.userId ,{name, mobile},{new:true}) 
    if (!EditUserOne) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ massage:"Profile Update Succesfully"});
  } catch (err) {
    res.status(500).json({ message: "Something is Wrong" });
  }
};
 


exports.validuser = validuser;
exports.editprofile = editprofile;

