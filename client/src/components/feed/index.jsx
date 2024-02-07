
import { useCookies } from "react-cookie";


export default function Feed(props) {
	const [cookies, setCookie] = useCookies(["auth_token"]);
	// console.log(cookies?.auth_token);

    const token = cookies?.auth_token;
    // console.log(token)


	return (
		<>
			<div className="w-6/12 mx-auto mt-4 mb-4">
				<ul className="flex  items-center ">
					<li className="">
						<img
							className="h-20"
							src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
							alt=""
						/>
					</li>
					<li className="size-5 ml-4 mr-4 font-bold">{props.name}</li>
					<li className="size-5 ml-4">{props.username}</li>
				</ul>
				<ul className="border-b-2 border-black">
					<li>
						<p>{props.content}</p>
					</li>
				</ul>
			</div>
		</>
	);
}
