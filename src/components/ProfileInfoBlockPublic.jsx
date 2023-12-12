import styled from "styled-components";
import "@fontsource/noto-sans";
import { ButtonDefaultColoured } from "./Button";
import { useState } from "react";
import { ForegroundBase, DialogWindowBase, DialogWindowSpecialText } from "../styles/ForegroundStyles";
import DialogWindowHeader from "./DialogWindowHeader";


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


export default function ProfileInfoBlockPublic() {
	const [ isWndWithPhoneVisible, toggleWndWithPhoneVisibility ] = useState(false);
	
	
	const onShowPhone = () => {
		toggleWndWithPhoneVisibility(true);
	}

	const onCloseDialogWindowClick = () => {
		toggleWndWithPhoneVisibility(false);
	}


	return (
		<ProfileDataBlock>
			<ProfileAvatarImg src="/img/avatar-placeholder.svg"/>
			<ProfileBaseDataBlock>
				<ProfileBaseDataNameText>NAME</ProfileBaseDataNameText>
				<ProfileBaseDataAddInfoText>CITY</ProfileBaseDataAddInfoText>
				<ProfileBaseDataAddInfoText>DATE</ProfileBaseDataAddInfoText>
				<ButtonDefaultColoured onClick={ onShowPhone } style={ { marginTop: "30px" } }>Показать телефон<br/>8 905 ХХХ ХХ ХХ</ButtonDefaultColoured>
			</ProfileBaseDataBlock>

			{
				(isWndWithPhoneVisible == true) &&
					(
						<ForegroundBase>
							<DialogWindowBase>
								<DialogWindowHeader title="Телефон продавца" closeFunc={ onCloseDialogWindowClick }/>
								<DialogWindowSpecialText>8 905 ХХХ ХХ ХХ</DialogWindowSpecialText>
							</DialogWindowBase>
						</ForegroundBase>)
			}
		</ProfileDataBlock>)
};
