const transporter=require("../../global_config/mailer");
require("dotenv").config();

const verifyClient=async(client)=>{
    try{
        const verificationToken=client.generateVerificationToken();
        const url=`http://localhost:8000/signup/verify/${client._id}/${verificationToken}`;
        
        await transporter.sendMail({
            from:process.env.FROM,
            to:client.username,
            subject:"Account verification",
            html:`Click <a href='${url}'>here</a>to verify your account`,
        })
        return true
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports=verifyClient;