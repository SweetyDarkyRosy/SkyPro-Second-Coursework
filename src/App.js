import React, { useEffect } from "react";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./authContext";


export default function App() {
	return (
		<React.Fragment>
			<AuthProvider>
				<AppRoutes/>
			</AuthProvider>
		</React.Fragment>);
}
