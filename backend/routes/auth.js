const express = require("express");

const authController = require("../controllers/auth");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);


// router.post("/reset",);

// router.post("/new-password",);


module.exports = router;
