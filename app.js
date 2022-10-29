require("dotenv").config();
const express=require("express");
const session=require("express-session");
const passport=require("passport");
const mongoose=require("mongoose");
const auth=require("./api/auth");
const clientProfile=require("./api/client_profile");
const vol=require("./api/vol");
const donate=require("./api/donate");

const app=express();

app.use(session({
    secret:process.env.TOKEN,
    resave:false,
    saveUninitialized:false,
}));

app.use(passport.initialize());
app.use(passport.session());

require("./config/db")(mongoose);

require("./config/passport")(passport);

app.get("/",(req,res)=>{
    res.send("Home route");
})

app.use("/",auth);
app.use("/",clientProfile);
app.use("/",vol);
app.use("/",donate)

app.listen(process.env.PORT,()=>{
    console.log("Listening on port "+process.env.PORT);
});