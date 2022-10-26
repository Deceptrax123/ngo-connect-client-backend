const mongoose=require("mongoose");
const Client=require("../../models/Client");

module.exports=(passport)=>{
    passport.use(Client.createStrategy());
    passport.serializeUser(Client.serializeUser());
    passport.deserializeUser(Client.deserializeUser());
}