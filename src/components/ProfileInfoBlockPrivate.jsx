import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { InputDefault } from "./Input";
import { ButtonDefaultColoured } from "./Button";
import { SectionNameSmall } from "../styles/PageStyles";
import { useAuthContext } from "../authContext";
import { UpdateUserData } from "../api";
import { useNotificationContext } from "../notificationContext";


const ProfileDataBlock = styled.div`
	margin-bottom: 70px;

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


export default function ProfileInfoBlockPrivate() {
	const authContext = useAuthContext();
	const notificationContext = useNotificationContext();

	const userNameInputRef = useRef(null);
	const userSurnameInputRef = useRef(null);
	const townInputRef = useRef(null);
	const phoneInputRef = useRef(null);

	const [ isUserNameInputErrorMarked, setUserNameInputErrorMarkedState ] = useState(false);
	const [ isPhoneNumberInputErrorMarked, setPhoneNumberInputErrorMarkedState ] = useState(false);


	const onUserNameInputInput = () => {
		setUserNameInputErrorMarkedState(false);
	}
	
	const onUserPhoneNumberInputInput = () => {
		setPhoneNumberInputErrorMarkedState(false);
	}

	const onSaveUserDataClick = () => {
		if (userNameInputRef.current.value.length === 0)
		{
			setUserNameInputErrorMarkedState(true);
			notificationContext.addNotificationError("Имя не было введено");
			return;
		}

		if (phoneInputRef.current.value.length === 0)
		{
			setPhoneNumberInputErrorMarkedState(true);
			notificationContext.addNotificationError("Номер телефона не был введён");
			return;
		}

		UpdateUserData({ id: authContext.userData.id, name: userNameInputRef.current.value, surname: userSurnameInputRef.current.value,
			phoneNumber: phoneInputRef.current.value, town: townInputRef.current.value }).then((result) => {
					if (result.status === 201)
					{
						notificationContext.addNotification("Изменения были успешно сохранены");

						authContext.setUserData(result.data.body);
					}
					else
					{
						notificationContext.addNotificationError(result.data.error);
					}
				});
	}

	const updateInputs = () => {
		userNameInputRef.current.value = authContext.userData.name;
		userSurnameInputRef.current.value = authContext.userData.surname;
		townInputRef.current.value = authContext.userData.town;
		phoneInputRef.current.value = authContext.userData.phoneNumber;
	}

	useEffect(() => {
			updateInputs();
		}, [authContext.userData]);

	useEffect(() => {
			updateInputs();
		}, []);


	return (
		<React.Fragment>
			<SectionNameSmall>Настройки профиля</SectionNameSmall>
			<ProfileDataBlock>
				<ProfileAvatarBlock>
					<ProfileAvatarImg src="/img/avatar-placeholder.svg"/>
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
							<InputDefault onInput={ onUserPhoneNumberInputInput } ref={ phoneInputRef } style={ { width: "100%" } }
								isErrorMarked={ isPhoneNumberInputErrorMarked }/>
						</InputGroup>
					</ProfileBaseDataGrid>
					<ButtonDefaultColoured onClick={ onSaveUserDataClick }>Сохранить</ButtonDefaultColoured>
				</ProfileBaseDataBlock>
			</ProfileDataBlock>
		</React.Fragment>)
};
