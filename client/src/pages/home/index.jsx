import { useEffect, useState } from "react";
import { Feeds } from "../../services/feed";


import Feed from "../../components/feed";

export default function Home() {
	const [feeds, setFeeds] = useState([]);
	useEffect(() => {
		(async () => {
			let projectRes = Feeds();
			setFeeds(await projectRes);
		})();
	}, []);
	const resFeeds = feeds;
	console.log(resFeeds);
	return (
		<>
			<section>
				<Feed
					name="user"
					username="username"
					content="test"

				/>
			</section>
		</>
	);
}
