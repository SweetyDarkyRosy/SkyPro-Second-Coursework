import React from "react";
import { Header } from "./components/Header";
import { AppRoutes } from "./routes";


export default function App() {
	return (
		<React.Fragment>
			<Header/>
			<AppRoutes/>
		</React.Fragment>);
}
