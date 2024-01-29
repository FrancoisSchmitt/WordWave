const express = require("express");
const isAuth = require("../middlewares/is-auth");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/userProfile", isAuth, userController.userProfile);
router.get("/userProfile/:", isAuth, userController.userById);

// router.put("/profile");

module.exports = router;
