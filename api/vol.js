const router=require("express").Router();
const bodyParser=require("body-parser");
const {getVol,getAllVol,delVol}=require("../controllers/vol_routes");

router.use(bodyParser.urlencoded({ extended:true}));

router.get("/current-vol/:volId",getVol);
router.get("/current-vol",getAllVol);
router.post("/current-vol/:volId:/remove",delVol);

module.exports=router;
