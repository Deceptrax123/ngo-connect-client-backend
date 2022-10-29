const router=require("express").Router();
const bodyParser=require("body-parser");
const {postDonate,getDonate}=require("../controllers/donate_routes");

router.use(bodyParser.urlencoded({ extended:true}));

router.post("/donations/:ngoId/donate",postDonate);
router.get("/donations/active-donations/:donateId",getDonate);

module.exports=router;
