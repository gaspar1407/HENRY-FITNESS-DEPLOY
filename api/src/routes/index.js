const { Router } = require("express");
const gym = require("./gym.routes");
const user = require("./user.routes.js");
const activity = require("./activities.routes.js");
const professional = require("./professional.router");
const classpass = require("./classpass.routes.js");
const userlogin = require("./userlogin.routes.js");
const adminlogin = require("./adminlogin.routes.js");
const admin = require("./admin.routes.js");
const userloginthird = require("./userloginthird.routes.js");
const { verifyToken, verifyAdmin } = require("../utils/sessionHandler.js");
const stripee = require("./stripe.routes.js");
const membership = require("./membership.routes.js");
const subscription = require("./subscription.routes.js");

const router = Router();

router.use('/gym', gym);
router.use("/user", user);
router.use("/activity", activity);
router.use('/professional', professional);
router.use('/classpass', classpass);
router.use('/userlogin', userlogin);
router.use('/adminlogin', adminlogin);
router.use("/admin", admin);
router.use("/userloginthird", userloginthird);
router.use("/payment", stripee);
router.use("/membership", membership);
router.use("/subscription", subscription);

module.exports = router;

