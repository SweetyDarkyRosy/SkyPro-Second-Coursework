import React, { useState } from "react";
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

	position: relative;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	gap: 10px;
`

const AccoutMenu = styled.div`
	padding: 43px 44px 47px 44px;

	position: absolute;
	top: 70px;
	right: 0;
	z-index: 100;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 10px;

	background-color: #009EE4;
	border: solid 1px #FFFFFF;
	border-radius: 6px;
`


export function Header() {
	const authContext = useAuthContext();

	const [ isAccoutMenuRolledOut, toggleAccoutMenuVisibility ] = useState(false);


	const onPublishAdClick = () => {

	};

	const onRollOutAccoutMenuClick = () => {
		toggleAccoutMenuVisibility(!isAccoutMenuRolledOut);
	};

	const onLogOutClick = () => {
		authContext.signOut();
		toggleAccoutMenuVisibility(false);
	};


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
							<ButtonSecondary onClick={ onPublishAdClick }>Разместить объявление</ButtonSecondary>
							<ButtonSecondary onClick={ onRollOutAccoutMenuClick }>Личный кабинет</ButtonSecondary>
						</React.Fragment>
					)
				}

				{
					(isAccoutMenuRolledOut != false) && 
						(
							<AccoutMenu>
								<Link to="/profile">
									<ButtonSecondary style={ { width: "200px" } }>Профиль</ButtonSecondary>
								</Link>
								<ButtonSecondary onClick={ onLogOutClick } style={ { width: "200px" } }>Выйти</ButtonSecondary>
							</AccoutMenu>)
				}
			</ButtonBlock>
		</HeaderBase>);
}
