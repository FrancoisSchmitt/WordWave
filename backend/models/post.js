const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		creator: {
			type: Schema.Types.Array,
			ref: "User",
			required: true,
		},

		UserCreator: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
