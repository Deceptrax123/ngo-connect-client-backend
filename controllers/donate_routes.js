const Donation=require("../../models/Donation");
const ngo=require("../../models/User");

const postDonate=async(req,res)=>{
    try{
        var i=0;
        let items=[]

        let q=Array.from(req.body.quantities);
        Array.from(req.body.items).forEach(item=>{
            let donationItem={
                itemName:item,
                quantity:q[i]
            };
            items.push(donationItem);
            i++;
        });
        
        const donation=new Donation({
            clientId:req.user._id,
            ngoId:req.params.ngoId,
            items:items,
        });
        await donation.save();

        res.status(200);
        res.json({message:"Donation details sent."});
    }catch(err){
        throw new Error(err);
    }
};

const getDonate=async(req,res)=>{
    if(req.isAuthenticated()){
        try{
            const donationDetails=await Donation.findById(req.params.donateId);
            if(!donationDetails){
                res.status(400);
                res.json({message:"No donations made yet"});
            }else{
                try{
                    const ngoDetails=await ngo.findById(donationDetails.ngoId);
                    let details={
                        ngoName:ngoDetails.name,
                        ngoEmail:ngoDetails.username,
                        donationItems:donationDetails.items,
                        status:donationDetails.status,
                    };
                    res.status(200);
                    res.json(details);
                }catch(err){
                    throw new Error(err);
                }
            }
        }catch(err){
            throw new Error(err);
        }
    }else{
        res.status(401).json({message:"Not authenticated"});
    }
};

module.exports={postDonate,getDonate};