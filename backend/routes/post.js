const express = require("express");
const isAuth = require("../middlewares/is-auth");

const postController = require("../controllers/post");

const router = express.Router();

router.post("/posts", isAuth, postController.post);

module.exports = router;
