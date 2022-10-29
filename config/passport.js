const mongoose=require("mongoose");
const Client=require("../../models/Client");

module.exports=(passport)=>{
    passport.serializeUser(Client.serializeUser());
    passport.deserializeUser(Client.deserializeUser());
    passport.use(Client.createStrategy());
}