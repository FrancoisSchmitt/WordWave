// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
	const name = req.body.name;
	const firstname = req.body.firstname;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const image = req.body.image;
	const bio = req.body.bio;
	try {
		const userEmail = await User.findOne({ email: email });
		if (userEmail) {
			const error = new Error("A user with this email could be found.");
			error.statusCode = 401;
			throw error;
		}
		const userUsername = await User.findOne({ username: username });
		if (userUsername) {
			const error = new Error("A user with this Username could be found.");
			error.statusCode = 401;
			throw error;
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({
			name: req.body.name,
			firstname: req.body.firstname,
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
			image: req.body.image,
			bio: req.body.bio,
		});
		const result = await user.save();
		res.status(200).json({ message: "User was create", userId: result._id });
		// next();
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			const error = new Error("A user with this email could not be found.");
			error.statusCode = 401;
			throw error;
		}
		loadedUser = user;
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error("Wrong password!");
			error.statusCode = 401;
			throw error;
		}
		const token = jwt.sign(
			{
				email: loadedUser.email,
				userId: loadedUser._id.toString(),
			},
			"SOME_SUPER_SECRET_SECRET",
			{ expiresIn: "24h" }
		);
		res.status(200).json({ token: token, userId: loadedUser._id.toString() });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

