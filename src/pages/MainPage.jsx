import React, { useEffect } from "react";
import { Centered } from "../styles/PageStyles"
import SearchBar from "../components/SearchBar";


export default function MainPage() {
	useEffect(() => {
			document.body.style.backgroundColor = "#FFFFFF";
		});

	return (
		<Centered>
			<SearchBar />
		</Centered>);
}
