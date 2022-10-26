const router=require("express").Router();
const bodyParser=require("body-parser");
const upload=require("../config/upload");
const {getAddDetail,postAddDetail}=require("../controllers/client_profile_routes");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/details",getAddDetail);
router.post("/details",upload.single('image'),postAddDetail);

module.exports=router;