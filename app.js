require("dotenv").config();
const express=require("express");
const session=require("express-session");
const passport=require("passport");
const mongoose=require("mongoose");
const auth=require("./api/auth");

const app=express();

require("./config/db")(mongoose);

app.use(session({
    secret:process.env.TOKEN,
    resave:false,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.get("/",(req,res)=>{
    res.send("Home route");
})

app.use("/",auth);

app.listen(process.env.PORT,function(){
    console.log("Listening on port "+process.env.PORT);
})