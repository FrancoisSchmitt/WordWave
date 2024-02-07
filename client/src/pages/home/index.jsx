import { useEffect, useState } from "react";
import { Feeds } from "../../services/feed";


import FeedComp from "../../components/feed";

export default function Home() {
	    const [feed, setFeed] = useState([]);
			useEffect(() => {
				(async () => {
					let feedsResult = Feeds();
					setFeed(await feedsResult);
				})();
			}, []);
	const resFeeds = feed?.data;
			console.log(resFeeds);


	return (
		<>
			<section>
				{resFeeds?.posts?.map((experiment, index) => (
					<FeedComp
						key={`experiment-${index}`}
						content={experiment?.content}
					/>
				))}
			</section>

		</>
	);
}
