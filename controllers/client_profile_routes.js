const clientDetail=require("../../models/Client_details");
const Client=require("../../models/Client");
const fs=require("fs");
const path=require("path");

const getAddDetail=async(req,res)=>{
    if(req.isAuthenticated()){
        res.send({message:"User details page"});
    }else{
        res.redirect("/login");
    }
}

const postAddDetail=async(req,res)=>{
    try{
        console.log(req.file);
        let identityVerif={
            data:fs.readFileSync(path.join("./public/uploads/"+req.file.filename)),
            content:"image/png"
        };

        let addressDetails={
            houseNo:req.body.houseNo,
            streetDetails:req.body.streetDetails
        }

        const clientInfo=await new clientDetail({
            clientId:req.user._id,
            dob:req.body.dob,
            city:req.body.city,
            address:addressDetails,
            verificationImage:identityVerif
        }).save();

        await Client.findByIdAndUpdate(req.user._id,{documentVerified:"Submitted and verification pending"});
        
        res.status(200);
        res.json({message:"Information submitted successfully"});
    }catch(err){
        console.log(err);
        throw new Error("Internal server error");
    }
}

module.exports={getAddDetail,postAddDetail};