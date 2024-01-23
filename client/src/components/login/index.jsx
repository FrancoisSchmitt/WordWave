import { Link } from "react-router-dom";

export default function LoginComp() {
	return (
		<>
			<div className="flex flex-col justify-center	 shadow-3xl  py-20 w-4/6 ">
				<form action="">
					<div className="flex mb-6 w-4/6 mx-auto">
						<input
							className="h-10 w-80 text-center border rounded-lg border-black"
							type="email"
							name="email"
							placeholder="Your Email"
						/>
					</div>
					<div className="flex mb-6 w-4/6 mx-auto">
						<input
							className="h-10 w-80 text-center border rounded-lg border-black"
							type="password"
							name="password"
							placeholder="Your Password"
						/>
					</div>
					<button className="flex items-center justify-center h-10 w-80 mx-auto mb-4 text-white bg-primary-btn  text-center rounded-lg border-black">
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
