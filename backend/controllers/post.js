const Post = require("../models/post");
const User = require("../models/user");

exports.post = async (req, res, next) => {
	const title = req.body.title;
	const content = req.body.content;
	const post = new Post({
		title: title,
		content: content,
		creator: req.userId,
	});
	try {
		await post.save();
		const user = await User.findById(req.userId);
		user.posts.push(post);
		const savedUser = await user.save();
		res.status(201).json({
			message: "Post created successfully!",
			post: post,
			creator: { _id: user._id, name: user.name, firstname: user.firstname },
		});
		return savedUser;
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};


exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findById(postId);

		if (!post) {
			const error = new Error("Could not find post.");
			error.statusCode = 404;
			throw error;
		}
		if (post.creator.toString() !== req.userId) {
			const error = new Error("Not authorized!");
			error.statusCode = 403;
			throw error;
		}
		// Check logged in user
		clearImage(post.imageUrl);
		await Post.findByIdAndRemove(postId);

		const user = await User.findById(req.userId);
		user.posts.pull(postId);
		await user.save();

		res.status(200).json({ message: "Deleted post." });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};