import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";


export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />}/>

			<Route path="/login" element={<LoginPage />}/>

			<Route path="*" element={<NotFoundPage />}/>
		</Routes>
	);
};