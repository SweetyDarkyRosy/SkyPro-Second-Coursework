import React, { useEffect, useState } from "react";
import { Centered, SectionDefault, SectionName } from "../styles/PageStyles"
import { Header } from "../components/Header";
import SearchBar from "../components/SearchBar";
import { AdvertisementList } from "../components/Advertisement"
import { getAds } from "../api";


export default function MainPage() {
	const [adList, setAdList] = useState([]);


	const updateAdList = () => {
		getAds().then((result) => {
				const adListProcessed = [];

				result.data.forEach((srcAdData) => {
						const adData = {
							id: srcAdData._id,
							authorId: srcAdData.author,
							title: srcAdData.title,
							description: srcAdData.description,
							created: srcAdData.created,
							price: srcAdData.price,
							images: srcAdData.images,
						}

						adListProcessed.push(adData);
					});

				setAdList(adListProcessed);
			});
	}

	useEffect(() => {
			document.body.style.backgroundColor = "#FFFFFF";

			updateAdList();
		}, []);
		

	return (
		<React.Fragment>
			<Header/>
			<Centered>
				<SearchBar />
				<SectionDefault>
					<SectionName>Объявления</SectionName>
					<AdvertisementList adList={ adList }/>
				</SectionDefault>
			</Centered>
		</React.Fragment>);
}
