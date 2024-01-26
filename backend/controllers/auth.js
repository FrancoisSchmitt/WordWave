// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
	const name = req.body.name;
	const firstname = req.body.firstname;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const image = req.body.image;
	const bio = req.body.bio;

	 bcrypt
		.hash(req.body.password, 12)
		.then((hash) => {
			const user = new User({
				name: req.body.name,
				firstname: req.body.firstname,
				username: req.body.username,
				email: req.body.email,
				password: hash,
				image: req.body.image,
				bio: req.body.bio,
			});
			user
				.save()
				.then(() => res.status(201).json({ message: "User was create!" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
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
			"somesupersecretsecret",
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
