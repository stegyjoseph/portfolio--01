const express=require("express")


const router=express.Router()


const{registerUser}=require("../controllers/userComtroller")
const { loginUser } = require("../controllers/userController")


router.route("/").post(registerUser)
router.post('/login',loginUser)

module.exports=router