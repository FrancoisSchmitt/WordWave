import axios from "axios";

export const Login = async (user) => {
	try {
		const userLogin = await axios.post(
			process.env.REACT_APP_BASE_URL_API + "/auth/login",
			JSON.stringify(user),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (userLogin.status !== 400) {
			console.log(userLogin);
			const loginResult = {
				status: userLogin?.status,
				// message: userLogin.data?.message,
				token: userLogin.data.token,
			};
			console.log(loginResult);
			return loginResult;
		}
	} catch (error) {
		const loginResultError = {
			status: error?.status,
			message: error.message,
		};
		console.log(loginResultError);
		return loginResultError;
	}
};
