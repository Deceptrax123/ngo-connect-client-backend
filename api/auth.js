const router=require("express").Router();
const bodyParser=require("body-parser");
const {getSignUp,postSignUp}=require("../controllers/auth_routes");

router.use(bodyParser.urlencoded({extended: true}));

router.get("/signup",getSignUp);
router.post("/signup",postSignUp);
// router.get("/login");
// router.post("/login");
// router.get("/verify/:id/:token");

module.exports=router;

