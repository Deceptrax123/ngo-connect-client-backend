const router=require("express").Router();
const bodyParser=require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

router.get("/signup");
router.post("/signup");
router.get("/login");
router.post("/login");
router.get("/verify/:id/:token");

module.exports=router;

