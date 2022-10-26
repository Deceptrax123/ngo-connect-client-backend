const Client=require("../../models/Client");
const emailVerification=require("../mailer/mail_verification");
const passport=require("passport");
const jwt=require("jsonwebtoken");

const getSignUp=(req,res)=>{
    res.send({message:"Sign up page"});
}

const postSignUp=async(req,res)=>{
    try{
        const existing=await Client.findOne({username:req.body.username});
        if(existing){
            res.status(409).send({message:"Existing user"});
        }else{
            const client=Client.register({username:req.body.username,name:req.body.name},req.body.password);
            const verify=await emailVerification(client);
            try{
                if(!verify){
                    res.status(409).send({message:"No such email exists"});
                }else{
                    res.status(200).send({message:"Email sent successfully"});
                }
            }catch(err){
                res.status(500).send({message:"Internal server error"});
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal server error"});
    }
}