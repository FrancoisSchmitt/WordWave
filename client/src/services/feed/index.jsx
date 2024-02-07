import axios from "axios";

export const Feeds = async () => {
	try {
		const res = await axios.get(
			process.env.REACT_APP_BASE_URL_API + "/feed/posts",
			JSON.stringify(),
			{
				headers: {
					"Content-Type": "application/json",

				},
			}
		);
		if (res.status !== 400) {
			const feedResults = {
				status: res?.status,
				message: res.data?.message,
				data: res?.data
			};
			console.log(feedResults);
			return feedResults;
		}
	} catch (error) {
		const feedResultsError = {
			status: error?.status,
			message: error.message,
			token: error.token,
		};
		// console.log(feedResultsError);
		return feedResultsError;
	}
};