const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error("Validation failed.");
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}

	const name = req.body.name;
	const firstname = req.body.firstname;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const image = req.body.image;
	const bio = req.body.bio;
	try {
		const hashedPwd = await bcrypt.hash(password, 12);
		const user = new User({
            name: name,
            firstname: firstname,
			username: username,
			email: email,
			password: hashedPwd,
			image: image,
			bio: bio,
        });
        console.log(user)
		const result = await user.save();
		res.status(201).json({ message: "User created!", userId: result._id });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
