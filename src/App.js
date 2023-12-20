import React, { useEffect } from "react";
import styled from "styled-components";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./authContext";
import { NotificationProvider } from "./notificationContext";


const Wrapper = styled.div`
	width: 100%;
	min-height: 100%;
`


export default function App() {
	return (
		<React.Fragment>
			<AuthProvider>
				<Wrapper>
					<NotificationProvider>
						<AppRoutes/>
					</NotificationProvider>
				</Wrapper>
			</AuthProvider>
		</React.Fragment>);
}
