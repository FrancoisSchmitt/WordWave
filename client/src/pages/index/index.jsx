import HomeContent from "../../components/home";

export default function Index() {
	return (
		<>
			<section>
				<div className="flex flex-row h-screen my-auto">
					<ul className="flex-col-2 mx-32 flex flex-col justify-items-center justify-center w-6/12">
						<HomeContent />
					</ul>
					
				</div>
			</section>
		</>
	);
}
