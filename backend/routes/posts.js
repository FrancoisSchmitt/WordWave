const express = require("express");
const isAuth = require("../middlewares/is-auth");

const postsController = require("../controllers/posts");

const router = express.Router();

module.exports = router;
