import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Login } from "../../services/users";

export default function LoginComp() {
	const Navigate = useNavigate();
	// const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [status, setStatus] = useState(false);
	const [messageError, setMessageError] = useState(false);

	const EMAIL_REGEX =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

	const inputIsFilled = (input) => {
		return input.lenght >= 4;
	};
	const initialState = () => {
		setEmail("");
		setPassword("");
	};
	console.log(email, password);

	const handleSubmit = (e) => {
		e.preventDefault();
		const rxEmail = EMAIL_REGEX.test(email);
		const rxPassword = PASSWORD_REGEX.test(password);

		const userLogin = Login({ email: email, password: password });
		userLogin
			.then((loginResult) => {
				if (
					loginResult.status === 200 &&
					inputIsFilled(email) &&
					inputIsFilled(password) &&
					rxEmail &&
					rxPassword
				) {
					setStatus(loginResult);
					console.log(loginResult.token);
				}
			})
			.catch((err) => {
				console.log(err);
				initialState();
				setMessageError("Warning some field are not filled in!");
			});
	};

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);
	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
	}, [password]);

	// useEffect(() => {
	// 	if()
	// })

	return (
		<>
			<div className="flex flex-col justify-center	 shadow-3xl  py-20 w-4/6 ">
				<form onSubmit={handleSubmit}>
					<div className="flex mb-6 w-4/6 mx-auto">
						<label htmlFor="email" className="hidden">
							email
						</label>
						<input
							className="h-10 w-80 text-center border rounded-lg border-black"
							type="email"
							name="email"
							placeholder="Your Email"
							id="email"
							value={email}
							// ref={userRef}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="off"
							aria-invalid={validEmail ? "false" : "true"}
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
							required
						/>
					</div>
					<div className="flex mb-6 w-4/6 mx-auto">
						<label htmlFor="password" className="hidden">
							password
						</label>
						<input
							className="h-10 w-80 text-center border rounded-lg border-black"
							type="password"
							name="password"
							placeholder="Your Password"
							id="password"
							value={password}
							// ref={userRef}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="off"
							aria-invalid={validPassword ? "false" : "true"}
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
							required
						/>
					</div>
					<button
						className="flex items-center justify-center h-10 w-80 mx-auto mb-4 text-white bg-primary-btn  text-center rounded-lg border-black"
						>
						Login
					</button>
				</form>
				<a href="/" className="text-primary-link mx-auto mb-4">
					Reset your password
				</a>
				<Link
					to="/register"
					className="h-10 w-40 mx-auto mb-4 text-white bg-secondary-btn flex justify-center items-center rounded-lg border-black"
				>
					Register
				</Link>
			</div>
		</>
	);
}
