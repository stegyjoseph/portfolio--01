const express =require("express");
require("dotenv").config();
const path=require("path");
const {notFound,errorHandler}=require("./middleware/errorMiddleware");
const userRoutes=require("./routes/userRoutes")
const connetDB = require("./config/db");



const app=express()
connetDB();

app.use(express.json({extended:false}));
app.use("/api/user0",userRoutes)
app.use(notFound);
app.use(errorHandler);

const PORT =process.env.PORT || 8000;
app.listen(PORT,()=>console.log('server started on port ${PORT}'));