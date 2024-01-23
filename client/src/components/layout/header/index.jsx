import { Link } from "react-router-dom";


export default function Header() {
	return (
		<>
			<div className="h-20 bg-primary-color flex flex-row">
				<ul className="flex flex-row items-center">
					<li className="ml-10">
						<h1 className="text-2xl">WordWave</h1>
					</li>
				</ul>
				<ul className="text-lg flex flex-row w-1/3 ml-auto items-center justify-evenly">
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
