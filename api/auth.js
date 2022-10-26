const router=require("express").Router();
const bodyParser=require("body-parser");
const {getSignUp,postSignUp,verify,getLogin,postLogin}=require("../controllers/auth_routes");

router.use(bodyParser.urlencoded({extended: true}));

router.get("/signup",getSignUp);
router.post("/signup",postSignUp);
router.get("/login",getLogin);
router.post("/login",postLogin);
router.get("/signup/verify/:id/:token",verify);

module.exports=router;

