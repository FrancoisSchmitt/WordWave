const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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
		console.log(user);
		const result = await user.save();
		res.status(201).json({ message: "User created!", userId: result._id });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
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

exports.reset = async (req, res, next) => {
	const errors = validationResult(req);

	try {
		//    const randomToken = await crypto.randomBytes(32, (err, buffer) => {
		//     if (err) {
		//         const error = new Error("Reset password failed.");
		// 		error.statusCode = 422;
		// 		error.data = errors.array();
		// 		throw error;
		//     }
		const token = buffer.toString("hex");

		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			const error = new Error("A user with this email could not be found.");
			error.statusCode = 401;
			throw error;
		}

		user.resetToken = token;
		user.resetTokenExpiration = date.now() + 3600000;

		console.log(user);
		const result = await user.save();
		// transport.sendMail({
		// 			to: req.body.email,
		// 			from: "Shop@node-complete.com",
		// 			subject: "Password reset",
		// 			html: `<p>You requested a password reset</p>
		// 			<p> click this <a href="http://localhost:8080/reset/${token}">link </a>to set a new password</p>
		// 		`,
		// 		});
		res.status(201).json({ message: "idk what i need to tell u!" });

		// })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
