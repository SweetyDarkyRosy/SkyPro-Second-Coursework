import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonSecondary } from "./Button";
import { useAuthContext } from "../authContext";


const HeaderBase = styled.div`
	padding: 20px 0;

	width: 100vw;

	background-color: #009EE4;
`;

const ButtonBlock = styled.div`
	margin: 0 140px;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	gap: 10px;
`


export function Header() {
	const authContext = useAuthContext();


	return (
		<HeaderBase>
			<ButtonBlock>
				{
					(authContext.userData == null) &&
					(
						<Link to="/login">
							<ButtonSecondary>Вход в личный кабинет</ButtonSecondary>
						</Link>
					)
				}

				{
					(authContext.userData != null) &&
					(
						<React.Fragment>
							<ButtonSecondary>Разместить объявление</ButtonSecondary>
							<ButtonSecondary>Личный кабинет</ButtonSecondary>
						</React.Fragment>
					)
				}
			</ButtonBlock>
		</HeaderBase>);
}
