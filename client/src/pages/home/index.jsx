import Login from "../../components/login";

export default function Home() {
	return (
		<>
			<section>
				<div className="flex flex-row h-screen my-auto">
					<ul className="flex-col-2 mx-32 flex flex-col justify-items-center justify-center w-6/12">
						<li className="mb-8 ">
							<h1 className="text-8xl  text-regal-blue">WordWave</h1>
						</li>
						<li>
							<p className="text-xl ">
								Welcome to WordWave, the innovative app that transforms digital
								communication. WordWave is more than a messaging app. It
								connects you to new friends, enriching exchanges, and unexpected
								discoveries.
							</p>
						</li>
					</ul>
					<ul className="w-6/12 flex flex-col justify-items-center justify-center ">
						<Login />
					</ul>
				</div>
			</section>
		</>
	);
}
