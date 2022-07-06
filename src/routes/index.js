const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {auth}=require("../middlewares/auth")
const { Registration ,Login} = require("./users")

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(urlencodedParser)
router.use(bodyParser.json())



router.post("/signup",Registration);
router.post("/signin",Login);
module.exports = router;


