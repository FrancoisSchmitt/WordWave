import HomeContent from "../../components/home";
import LoginComp from "../../components/login";

export default function Login() {
	return (
		<>
			<section>
				<div className="flex flex-row h-screen my-auto">
					<ul className="flex-col-2 mx-32 flex flex-col justify-items-center justify-center w-6/12">
						<HomeContent />
					</ul>
					<ul className="w-6/12 flex flex-col justify-items-center justify-center ">
						<LoginComp />
					</ul>
				</div>
			</section>
		</>
	);
}