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
            const client=await Client.register({username:req.body.username,name:req.body.name,verified:false},req.body.password);
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

const verify=async(req,res)=>{
    try{
        payload=jwt.verify(req.params.token,process.env.USER_VERIFICATION_TOKEN);
        if(payload){
            try{
                await Client.findByIdAndUpdate(req.params.id,{verified:true});
                res.status(200).send({message:"User verified"});
            }catch(err){
                res.status(500).send({message:"Internal server error"});
            }
        }else{
            res.status(409).send({message:"Link expired"});
        }
    }catch(err){
        res.status(500).send("Internal server error");
    }
}

const getLogin=(req,res)=>{
    res.send({message:"Login page"});
}

const postLogin=async(req,res)=>{
    try{
        const client=await Client.findOne({username:req.body.username});
        if(!client){
            res.status(409).send({message:"No such user exists"});
        }else if(!client.verified){
            res.status(401).send({message:"Not verified"});
        }else{
            req.login(client,(err)=>{
                if(err){
                    res.status(500).send({message:"Internal server error"});
                }else{
                    passport.authenticate("local",(err,client,info)=>{
                        if(err){
                            res.status(500).send({message:err});
                        }else if(!client){
                            res.status(401).send({message:"Incorrect username or password"});
                        }else{
                            res.status(200).send({message:"Logged in successfully"});
                        }
                    })(req,res)
                }
            })
        }
    }catch(err){
        res.status(500).send({message:"Internal server error"});
    }
}
module.exports={getSignUp,postSignUp,verify,getLogin,postLogin};