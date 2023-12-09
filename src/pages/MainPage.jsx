import React, { useEffect } from "react";
import { Centered, SectionDefault, SectionName } from "../styles/PageStyles"
import { Header } from "../components/Header";
import SearchBar from "../components/SearchBar";
import { AdvertisementList } from "../components/Advertisement"


export default function MainPage() {
	useEffect(() => {
			document.body.style.backgroundColor = "#FFFFFF";
		});

	return (
		<React.Fragment>
			<Header/>
			<Centered>
				<SearchBar />
				<SectionDefault>
					<SectionName>Объявления</SectionName>
					<AdvertisementList/>
				</SectionDefault>
			</Centered>
		</React.Fragment>);
}
