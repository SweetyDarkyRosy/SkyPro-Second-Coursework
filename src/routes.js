import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";


export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />}/>
		</Routes>
	);
};