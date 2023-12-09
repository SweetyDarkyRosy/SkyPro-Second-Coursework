import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";


export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />}/>

			<Route path="*" element={<NotFoundPage />}/>
		</Routes>
	);
};