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