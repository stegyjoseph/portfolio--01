const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: string,
        required: true,
    },
 isAdmin: {
    type: Boolean,
    required: true,
    default: false,
},},
     {timestamps:true}
 );
 userSchema.methods.matchPassword=async function(enterpassword){
     return await bcrypt.compare(enterpassword,this.password);
 };
 userSchema.pre("save", async function(next){
     if(!this.isModified("password")){
         next();
     }
     const salt=await bcrypt.genSalt(10);
     this.password=await bcrypt.hash(this.password,salt);
 });
 module.exports=User=mongoose.model('User',userSchema);