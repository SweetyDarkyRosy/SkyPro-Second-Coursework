import React, { useEffect, useRef, useState } from "react";
import { Centered, SectionDefault, SectionNameSmall } from "../styles/PageStyles";
import { Header } from "../components/Header";
import ReturnBar from "../components/ReturnBar";
import { useAuthContext } from "../authContext";
import styled from "styled-components";
import { AdvertisementList } from "../components/Advertisement";
import { ButtonDefaultColoured } from "../components/Button";
import { InputDefault } from "../components/Input";


const WelcomeText = styled.h2`
	margin: 42px 0 10px 0;

	color: #000000;
	font-weight: 500;
	font-size: 40px;
	line-height: 88px;
	text-align: left;
`;

const ProfileDataBlock = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 50px;
`;

const ProfileAvatarBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const ProfileAvatarImg = styled.img`
	width: 170px;
	height: 170px;
`;

const ProfileChangeAvatarActionText = styled.p`
	margin-top: 10px;

	color: #009EE4;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	text-align: center;

	cursor: pointer;

	&:hover {
		color: #0080C1;
	}

	&:disabled {
		color: #D9D9D9;
	}
`;

const ProfileBaseDataBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 30px;
`;

const ProfileBaseDataGrid = styled.div`
	width: 614px;

	box-sizing: border-box;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	row-gap: 14px;
	column-gap: 20px;
`;

const InputGroup = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 4px;

	&:focus-within {
		label {
			color: #009EE4;
		}
	}
`;

const InputGroupLabel = styled.label`
	color: #C4C4C4;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	text-align: left;
`;


export default function ProfilePage() {
	const authContext = useAuthContext();

	const userNameInputRef = useRef(null);
	const userSurnameInputRef = useRef(null);
	const townInputRef = useRef(null);
	const phoneInputRef = useRef(null);

	const [ isUserNameInputErrorMarked, setUserNameInputErrorMarkedState ] = useState(false);


	const onUserNameInputInput = () => {
		setUserNameInputErrorMarkedState(false);
	}

	const onSaveUserDataClick = () => {
		if (userNameInputRef.current.value.length === 0)
		{
			setUserNameInputErrorMarkedState(true);
			return;
		}
	}

	useEffect(() => {
			document.body.style.backgroundColor = "#FFFFFF";
		});


	return (
		<React.Fragment>
			<Header/>
			<Centered>
				<ReturnBar/>
				<WelcomeText>Здравствуйте, { authContext.userData.name }</WelcomeText>
				<SectionDefault>
					<SectionNameSmall>Настройки профиля</SectionNameSmall>
					<ProfileDataBlock>
						<ProfileAvatarBlock>
							<ProfileAvatarImg src="/img/avatarPlaceholder.svg"/>
							<ProfileChangeAvatarActionText>Заменить</ProfileChangeAvatarActionText>
						</ProfileAvatarBlock>
						<ProfileBaseDataBlock>
							<ProfileBaseDataGrid>
								<InputGroup>
									<InputGroupLabel>Имя</InputGroupLabel>
									<InputDefault onInput={ onUserNameInputInput } ref={ userNameInputRef } style={ { width: "100%" } }
										isErrorMarked={ isUserNameInputErrorMarked }/>
								</InputGroup>
								<InputGroup>
									<InputGroupLabel>Фамилия</InputGroupLabel>
									<InputDefault ref={ userSurnameInputRef } style={ { width: "100%" } }/>
								</InputGroup>
								<InputGroup>
									<InputGroupLabel>Город</InputGroupLabel>
									<InputDefault ref={ townInputRef } style={ { width: "100%" } }/>
								</InputGroup>
								<InputGroup style={ { gridColumn: "span 2", gridRow: "row 3;" } }>
									<InputGroupLabel>Телефон</InputGroupLabel>
									<InputDefault ref={ phoneInputRef } style={ { width: "100%" } }/>
								</InputGroup>
							</ProfileBaseDataGrid>
							<ButtonDefaultColoured onClick={ onSaveUserDataClick }>Сохранить</ButtonDefaultColoured>
						</ProfileBaseDataBlock>
					</ProfileDataBlock>
				</SectionDefault>
				<SectionDefault>
					<SectionNameSmall>Мои товары</SectionNameSmall>
					<AdvertisementList/>
				</SectionDefault>
			</Centered>
		</React.Fragment>);
}