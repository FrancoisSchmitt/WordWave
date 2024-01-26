const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	firstname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	bio: {
		type: String,
		required: false,
	},
	// status: {
	// 	type: String,
	// 	default: "I am new!",
	// },
});

module.exports = mongoose.model("User", userSchema);
