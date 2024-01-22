const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const loginDatabase = await mongoose.connect(process.env.MONGO_URI);
		// console.log(`MongoDB Connect : ${loginDatabase.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
module.exports = connectDB;
