const express = require("express");
const isAuth = require("../middlewares/is-auth");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/users", isAuth, userController.userProfile);

// router.put("/profile");

module.exports = router;
