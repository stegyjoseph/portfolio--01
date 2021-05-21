const mongoose=require("mongoose");
const connetDB=async()=>{
    try{
        await mongoose.connect(provess.env.MONGO_URI,{
useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true,
        });
        console.log('MongoDB connected');
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
};
module.exports=connetDB;