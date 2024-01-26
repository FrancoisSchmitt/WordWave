import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Register } from "../../services/users";

export default function RegisterComp() {
	const userRef = useRef();
	const errRef = useRef();
	const dispatch = useDispatch();
	const Navigate = useNavigate();

	const [name, setName] = useState("");
	const [validName, setValidName] = useState(false);
	const [nameFocus, setNameFocus] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [validFirstName, setValidFirstName] = useState(false);
	const [firstNameFocus, setFirstNameFocus] = useState(false);

	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [usernameFocus, setUsernameFocus] = useState(false);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [confirmPassword, setConfirmPassword] = useState("");
	const [validConfirmPassword, setValidConfirmPassword] = useState(false);
	const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

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

	console.log(name, firstName, username, email, password, confirmPassword);

	const handleSubmit = (event) => {
		event.preventDefault();
		const rxEmail = EMAIL_REGEX.test(email);
		const rxPassword = PASSWORD_REGEX.test(password);
		const rxPasswordConfirm = PASSWORD_REGEX.test(confirmPassword);
		// adding logic to register new account
		const register = Register({
			name: name,
			firstname: firstName,
			username: username,
			email: email,
			password: password,

		});
		register.then((results) => {
			if (
				results.status === 200 &&
				inputIsFilled(email) &&
				inputIsFilled(password) &&
				rxEmail &&
				rxPassword === rxPasswordConfirm
			) {
				setStatus(results.status);
				console.log(results.token);
			} else {
				console.log(results);
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
			Navigate("/");
		}
	}, [tokenSelector, status, Navigate]);

	return (
		<>
			<div className="flex flex-col justify-center shadow-3xl py-20 w-4/6 ">
				<form onSubmit={handleSubmit}>
					<p
						ref={errRef}
						className={errorMessage ? "errorMessage" : "offscreen"}
						aria-live="assertive"
					>
						{errorMessage}
					</p>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label className="hidden" htmlFor="name">
							Name
						</label>
						<input
							className="flex items-center justify-center h-10 w-80  mb-0 text-center rounded-lg border border-black"
							type="text"
							id="name"
							value={name}
							aria-invalid={validName ? "false" : "true"}
							onChange={(e) => setName(e.target.value)}
							aria-describedby="pwdnote"
							onFocus={() => setNameFocus(true)}
							onBlur={() => setNameFocus(false)}
							autoComplete="off"
							placeholder="Your Name"
						/>
						{name.length >= 1 && name.length < 4 && (
							<small id="emailnote" className="text-red-500 -mb-4">
								The text in this field should not contain any special characters
								and should have a minimum length of three characters.
							</small>
						)}
					</div>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label className="hidden" htmlFor="firstName">
							firstName
						</label>
						<input
							className="flex items-center justify-center h-10 w-80  mb-0 text-center rounded-lg border border-black"
							type="text"
							id="firstName"
							value={firstName}
							aria-invalid={validFirstName ? "false" : "true"}
							onChange={(e) => setFirstName(e.target.value)}
							aria-describedby="pwdnote"
							onFocus={() => setFirstNameFocus(true)}
							onBlur={() => setFirstNameFocus(false)}
							autoComplete="off"
							placeholder="Your Firstname"
						/>
						{firstName.length >= 1 && firstName.length < 4 && (
							<small id="emailnote" className="text-red-500 -mb-4">
								The text in this field should not contain any special characters
								and should have a minimum length of three characters.
							</small>
						)}
					</div>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label className="hidden" htmlFor="username">
							Username
						</label>
						<input
							className="flex items-center justify-center h-10 w-80  mb-0 text-center rounded-lg border border-black"
							type="text"
							id="username"
							value={username}
							ref={userRef}
							aria-invalid={validUsername ? "false" : "true"}
							onChange={(e) => setUsername(e.target.value)}
							required
							autoComplete="off"
							aria-describedby="emailnote"
							onFocus={() => setUsernameFocus(true)}
							onBlur={() => setUsernameFocus(false)}
							placeholder="Your Username"
						/>
						{username.length >= 1 && username.length < 4 && (
							<small id="emailnote" className="text-red-500 -mb-4">
								The text in this field should not contain any special characters
								and should have a minimum length of three characters.
							</small>
						)}
					</div>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label className="hidden" htmlFor="email">
							Email
						</label>
						<input
							className="flex items-center justify-center h-10 w-80  mb-0 text-center rounded-lg border border-black"
							type="email"
							id="email"
							value={email}
							aria-invalid={validEmail ? "false" : "true"}
							onChange={(e) => setEmail(e.target.value)}
							aria-describedby="pwdnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
							autoComplete="off"
							placeholder="Your Email"
						/>
						{emailFocus && !validEmail && (
							<small id="emailnote" className="text-red-500 -mb-4">
								The email must follow this example: example@example.com
							</small>
						)}
					</div>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label className="hidden" htmlFor="password">
							Password
						</label>
						<input
							className="flex items-center justify-center h-10 w-80  mb-0 text-center rounded-lg border border-black"
							type="password"
							id="password"
							value={password}
							aria-invalid={validPassword ? "false" : "true"}
							onChange={(e) => setPassword(e.target.value)}
							aria-describedby="pwdnote"
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
							autoComplete="off"
							placeholder="Your Password"
						/>
						{password.length >= 1 && password.length < 4 && (
							<small id="emailnote" className="text-red-500 -mb-4">
								Your password must contain at least one uppercase and lowercase
								letter, one number, and one special character.
							</small>
						)}
					</div>
					<div className="flex flex-col mb-6 w-4/6 mx-9">
						<label className="hidden" htmlFor="password">
							Password
						</label>
						<input
							className="flex items-center justify-center h-10 w-80  mb-0 text-center rounded-lg border border-black"
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							aria-invalid={validConfirmPassword ? "false" : "true"}
							onChange={(e) => setConfirmPassword(e.target.value)}
							aria-describedby="pwdnote"
							onFocus={() => setConfirmPasswordFocus(true)}
							onBlur={() => setConfirmPasswordFocus(false)}
							autoComplete="off"
							placeholder="Confirm your password "
						/>
						{confirmPassword.length >= 1 && confirmPassword.length < 4 && (
							<small id="emailnote" className="text-red-500 -mb-4">
								The passwords entered do not match.
							</small>
						)}
					</div>
					<button
						disabled={!validEmail || !validPassword ? true : false}
						className="flex items-center justify-center h-10 w-80 mx-auto mb-0 bg-primary-btn text-white text-center rounded-lg border-black"
					>
						Register
					</button>
				</form>
			</div>
		</>
	);
}
