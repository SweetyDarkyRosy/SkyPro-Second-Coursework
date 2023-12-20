import styled from "styled-components";
import "@fontsource/noto-sans";
import React, { useEffect, useState } from "react";
import { ForegroundBase, DialogWindowBase, DialogWindowSpecialText } from "../styles/ForegroundStyles";
import DialogWindowHeader from "./DialogWindowHeader";
import { getUserData } from "../api";
import { ButtonDefaultColoured } from "./Button";
import { useNotificationContext } from "../notificationContext";
import Skeleton from "react-loading-skeleton";


const ProfileDataBlock = styled.div`
	margin-bottom: 70px;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 50px;
`;

const ProfileAvatarImg = styled.img`
	width: 170px;
	height: 170px;
`;

const ProfileBaseDataBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const ProfileBaseDataNameText = styled.p`
	font-family: Noto Sans;

	color: #000000;
	font-weight: 600;
	font-size: 20px;
	line-height: 40px;
	text-align: left;
`;

const ProfileBaseDataAddInfoText = styled.p`
	color: #5F5F5F;
	font-weight: 400;
	font-size: 16px;
	line-height: 32px;
	text-align: left;
`;


export default function ProfileInfoBlockPublic({ userId }) {
	const notificationContext = useNotificationContext();

	const [ userData, setUserData ] = useState(false);
	const [ authorAccountCreationDateAndTime, setAuthorAccountCreationDateAndTime ] = useState("");

	const [ isWndWithPhoneVisible, toggleWndWithPhoneVisibility ] = useState(false);
	
	
	const onShowPhone = () => {
		toggleWndWithPhoneVisibility(true);
	}

	const onCloseDialogWindowClick = () => {
		toggleWndWithPhoneVisibility(false);
	}

	const formatAuthorDateAndTime = () => {
		const months = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
			'октября', 'ноября', 'декабря' ];

		const createdTimeAndDate = new Date(userData.created);

		let dateAndTimeText = 'Продаёт товары с ';
		dateAndTimeText += months[createdTimeAndDate.getMonth()];
		dateAndTimeText += ' ';
		dateAndTimeText += createdTimeAndDate.getFullYear();

		setAuthorAccountCreationDateAndTime(dateAndTimeText);
	}

	useEffect(() => {
			getUserData({ id: userId }).then((result) => {
					if (result.status === 200)
					{
						setUserData(result.data);
					}
					else
					{
						notificationContext.addNotificationError(result.data.error);
					}
				})
		}, [])

	useEffect(() => {
			if (userData != null)
			{
				formatAuthorDateAndTime();
			}
		}, [userData])


	return (
		<ProfileDataBlock>
			<ProfileAvatarImg src="/img/avatar-placeholder.svg"/>
			<ProfileBaseDataBlock>
				{
					(userData == null) ?
						(
							<React.Fragment>
								<Skeleton variant="rectangular" width={ "100px" } height={ "30px" }/>
								<Skeleton variant="rectangular" width={ "100px" } height={ "30px" }/>
								<Skeleton variant="rectangular" width={ "100px" } height={ "30px" }/>
							</React.Fragment>) :
						(
							<React.Fragment>
								<ProfileBaseDataNameText>{ userData.name }{ (userData.surname != "") && (" " + userData.surname)}</ProfileBaseDataNameText>
								<ProfileBaseDataAddInfoText>{ userData.town }</ProfileBaseDataAddInfoText>
								<ProfileBaseDataAddInfoText>{ authorAccountCreationDateAndTime }</ProfileBaseDataAddInfoText>
							</React.Fragment>)
				}
				<ButtonDefaultColoured onClick={ onShowPhone } style={ { marginTop: "30px" } }>Показать телефон<br/>
					{ String(userData.phoneNumber).replace(/(?<=\S{5})\S/g, "X") }</ButtonDefaultColoured>
			</ProfileBaseDataBlock>

			{
				(isWndWithPhoneVisible == true) &&
					(
						<ForegroundBase>
							<DialogWindowBase>
								<DialogWindowHeader title="Телефон продавца" closeFunc={ onCloseDialogWindowClick }/>
								<DialogWindowSpecialText>{ userData.phoneNumber }</DialogWindowSpecialText>
							</DialogWindowBase>
						</ForegroundBase>)
			}
		</ProfileDataBlock>)
};
