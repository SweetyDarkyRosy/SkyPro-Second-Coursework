import React, { createContext, useContext, useState } from "react";


export const AuthContext = createContext();


export function useAuthContext() {
	return useContext(AuthContext);
}


export const AuthProvider = (props) => {
	const [user, setUser] = useState(null);


	const setUserData = (userData) => {
		setUser(userData);
	}

	const signOut = () => {
		setUser(null);
	}


	return (
		<AuthContext.Provider value={ { userData: user, setUserData, signOut } }>
			{ props.children }
		</AuthContext.Provider>);
}
