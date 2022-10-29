const volRequest=require("../../models/Volunteering");
const Ticket=require("../../models/Ticket");
const Details=require("../../models/Details");
const Client=require("../../models/Client");
const Ngo=require("../../models/User");

const getVol=async(req,res)=>{
    if(req.isAuthenticated()){
        try{
            const vol=await volRequest.findById(req.params.volId);
            try{
                const ticket=await Ticket.findById(vol.ticketId);
                try{
                    const ngo=await Ngo.findById(vol.ngoId);
                    try{
                        const ngoDetails=await Details.findById(vol.ngoID);

                        let dispItems={
                            basicDetails:{
                                ngoName:ngo.name,
                                ngoContact:ngo.contact,
                                ngoEmail:ngo.username,
                                clientName:req.user.name,
                                ngoAddress:{
                                    street:ngoDetails.street,
                                    pin:ngoDetails.pin
                                },
                            },
                            serviceDetails:ticket
                        }
                        res.status(200);
                        res.json(dispItems);
                    }catch(err){
                        throw new Error("Internal server error");
                    }
                }catch(err){
                    throw new Error("Internal server error");
                }
            }catch(err){
                throw new Error("Internal server error");
            }
        }catch(err){
            throw new Error("Internal server error");
        }
    }else{
        res.status(409);
        res.json({message:"Not authenticated"});
    }
};

const getAllVol=async(res,req)=>{
    if(req.isAuthenticated()){
        try{
            const vols=await volRequest.find({clientId:req.user._id});
            res.json(vols);
        }catch(err){
            throw new Error("Internal server error");
        }
    }else{
        res.status(409);
        res.json({message:"Not authenticated"});
    }
};

const delVol=async(req,res)=>{
    try{ 
        await volRequest.findByIdAndDelete(req.params.volId);
        res.json({message:"request deleted successfully"});
    }catch(err){
        throw new Error("Internal server error");
    }
};

module.exports={getVol,getAllVol,delVol};
