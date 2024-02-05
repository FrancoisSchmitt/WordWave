import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Login } from "../../services/users";
import { token } from "../../store/actions";

export default function LoginComp() {
	const userRef = useRef();
	const errRef = useRef();
	const dispatch = useDispatch();
	const Navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [status, setStatus] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const EMAIL_REGEX =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const PASSWORD_REGEX =
		/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;

	const tokenSelector = useSelector((state) => state.authTokens?.value);


	const inputIsFilled = (input) => {
		return input.length >= 4;
	};

	const initialStates = () => {
		setEmail("");
		setPassword("");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const rxEmail = EMAIL_REGEX.test(email);
		const rxPassword = PASSWORD_REGEX.test(password);

		const log = Login({ email: email, password: password });
		log.then((results) => {
			if (
				results.status === 200 &&
				inputIsFilled(email) &&
				inputIsFilled(password) &&
				rxEmail &&
				rxPassword
			) {
				setStatus(results.status);
				dispatch(token(results.token));
				console.log(results.token);
			} else {
				console.log(results);
				initialStates();
				setErrorMessage("Your email with your password are wrong");
			}
			errRef.current.focus();
		});
	};

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		if (tokenSelector !== "" && status === 200) {
			Navigate("/home");
		}
	}, [tokenSelector, status, Navigate]);

	return (
		<>
			<div className="flex flex-col justify-center shadow-3xl  py-20 w-4/6 ">
				<form onSubmit={handleSubmit}>
					<p
						ref={errRef}
						className={errorMessage ? "errorMessage" : "offscreen"}
						aria-live="assertive"
					>
						{errorMessage}
					</p>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label htmlFor="email" className="hidden">
							Email
						</label>
						<input
							className="flex items-center justify-center h-10 w-80  mb-4 text-center rounded-lg border border-black"
							type="email"
							id="email"
							value={email}
							ref={userRef}
							aria-invalid={validEmail ? "false" : "true"}
							onChange={(e) => setEmail(e.target.value)}
							required
							aria-describedby="emailnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
							placeholder="Your Email"
						/>
						{emailFocus && !validEmail && (
							<small id="emailnote" className="text-red-500">
								The email must follow this example: example@example.com
							</small>
						)}
					</div>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label htmlFor="password" className="hidden">
							Password
						</label>
						<input
							className="flex items-center justify-center h-10 w-80 mx-auto mb-4 text-center rounded-lg border border-black"
							type="password"
							id="password"
							value={password}
							aria-invalid={validPassword ? "false" : "true"}
							onChange={(e) => setPassword(e.target.value)}
							aria-describedby="pwdnote"
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
							placeholder="Your Password"
						/>
						{passwordFocus && !validPassword && (
							<small id="pwdnote" className="text-red-500">
								Your password must contain at least one uppercase and lowercase
								letter, one number, and one special character.
							</small>
						)}
					</div>
					<button
						disabled={!validEmail || !validPassword ? true : false}
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
