const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.userProfile = (req, res, next) => {
	const jwtToken = req.headers.authorization.split("Bearer")[1].trim();
	const decodedJwtToken = jwt.decode(jwtToken);
	const user = User.findOne({ _id: decodedJwtToken.userId })

		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "utilsateur invalide !" });
			}
			console.log(decodedJwtToken);
			res.status(200).json(user);
			console.log(user);
			return user.toObject();
		})
		.catch((error) => res.status(404).json(error));
};

// Probably need to add some result to see posts or other 
exports.userById = (req, res, next) => {
	User.findOne({ _id: req.params.id })
		.then((userId) => res.status(200).json(userId))
		.catch((error) => res.status(404).json({ error }));
};

exports.allUser = (req, res, next) => {
	User.find()
		.then((AllUsers) => res.status(200).json(AllUsers))
		.catch((error) => res.status(400).json({ error }));
};