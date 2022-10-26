require("dotenv").config();

module.exports=(mongoose)=>{
    mongoose.connect(process.env.MONGO_CONNECT,{useNewUrlParser:true});
}