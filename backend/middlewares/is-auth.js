const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
	try {
		const token = req.header.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "somesupersecretsecret");
		const userId = decodedToken.userId;
		req.quth = {
			userId: userId,
		};
		next();
	} catch (error) {
		res.status(401).json({ error });
	}
};
