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
            res.status(409);
            res.json({message:"Existing user"});
        }else{
            const client=await Client.register({username:req.body.username,name:req.body.name,verified:false},req.body.password);
            const verify=await emailVerification(client);
            try{
                if(!verify){
                    res.status(409);
                    res.json({message:"No such email exists"});
                }else{
                    res.status(200);
                    res.json({message:"Email sent successfully"});
                }
            }catch(err){
                res.status(500);
                res.json({message:"Internal server error"});
            }
        }
    }catch(err){
        res.status(500);
        res.json({message:"Internal server error"});
    }
};

const verify=async(req,res)=>{
    try{
        payload=jwt.verify(req.params.token,process.env.USER_VERIFICATION_TOKEN);
        if(payload){
            try{
                await Client.findByIdAndUpdate(req.params.id,{verified:true});
                res.status(200);
                res.json({message:"User verified"});
            }catch(err){
                res.status(500);
                res.json({message:"Internal server error"});
            }
        }else{
            res.status(409);
            res.json({message:"Link expired"});
        }
    }catch(err){
        res.status(500);
        res.json("internal server error");
    }
};

const getLogin=(req,res)=>{
    res.send({message:"Login page"});
};

const postLogin=async(req,res)=>{
    try{
        const client=await Client.findOne({username:req.body.username});
        if(!client){
            res.json({message:"No such user exists"});
        }else if(!client.verified){
            res.json({message:"Not verified"});
        }else{
           passport.authenticate("local",(err,client,info)=>{
            if(err){
                throw new Error(err);
            }
            if(!client){
                 res.json({message:"Incorrect username or passowrd"});
            }else{
                req.login(client,(err)=>{
                    if(err){
                        throw new Error(err);
                    }else{
                        res.status(200);
                        res.json({message:"Logged in successfully"});
                    }
                })
            }
           })(req,res);
        }
    }catch(err){
        res.status(500);
        throw new Error("Internal server error");
    }
};
module.exports={getSignUp,postSignUp,verify,getLogin,postLogin};