import React from "react";
import { Header } from "./components/Header";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./authContext";


export default function App() {
	return (
		<React.Fragment>
			<AuthProvider>
				<Header/>
				<AppRoutes/>
			</AuthProvider>
		</React.Fragment>);
}
