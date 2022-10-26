require("dotenv").config();
const express=require("express");

const app=express();

app.listen(process.env.PORT,function(){
    console.log("Listening on port "+process.env.PORT);
})