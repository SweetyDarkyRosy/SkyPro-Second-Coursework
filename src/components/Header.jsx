import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ButtonDefaultColoured, ButtonSecondary } from "./Button";
import { useAuthContext } from "../authContext";
import { DialogWindowBase, DialogWindowRegularText, ForegroundBase } from "../styles/ForegroundStyles";
import DialogWindowHeader from "./DialogWindowHeader";
import { InputDefault, TextBoxDefault } from "./Input";
import { PhotoPreviewDynamic, PhotoPreviewList } from "./PhotoPreview";
import { useNotificationContext } from "../notificationContext";
import { addNewAd } from "../api";


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

const PhotoBlockHeaderSpan = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;

const SpanSecondaryText = styled.p`
	color: #0000004D;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
`;

const PriceInputSpan = styled.span`
	padding: 13px 19px;

	height: 50px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 4px;

	box-sizing: border-box;

	border-radius: 6px;
	border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #00000033') };

	&:focus-within {
		border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #009EE4') };
	}
`;

export const PriceInputCustomInput = styled.input`
	width: 100%;

	border: none;

	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	&:focus {
		outline: none;
	}
`;

const PriceInputSymbol = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
`


export function Header() {
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const notificationContext = useNotificationContext();

	const [ isAccoutMenuRolledOut, toggleAccoutMenuVisibility ] = useState(false);
	const [ isAddAdDialogWndVisible, toggleAddAdDialogWndVisibility ] = useState(false);

	const adTitleInputRef = useRef(null);
	const adDescriptionInputRef = useRef(null);
	const adPriceInputRef = useRef(null);

	const [ isAdTitleInputErrorMarked, setAdTitleInputErrorMarkedState ] = useState(false);
	const [ isAdPriceInputErrorMarked, setAdPriceInputErrorMarkedState ] = useState(false);


	const onRollOutAccoutMenuClick = () => {
		toggleAccoutMenuVisibility(!isAccoutMenuRolledOut);
	};

	const onLogOutClick = () => {
		authContext.signOut();
		navigate("/", { replace: true });
	};

	const onShowAddAdDialogWindowClick = () => {
		toggleAddAdDialogWndVisibility(true);
	};

	const onCloseAddAdDialogWindowClick = () => {
		toggleAddAdDialogWndVisibility(false);

		setAdTitleInputErrorMarkedState(false);
		setAdPriceInputErrorMarkedState(false);
	};

	const onAdTitleInputInput = () => {
		setAdTitleInputErrorMarkedState(false);
	}

	const onAdPriceInputKeyDown = (event) => {
		if ((isNaN(event.key) === true) && (event.key !== "Backspace"))
		{
			event.preventDefault();
		}
	}

	const onAdPriceInputInput = () => {
		setAdPriceInputErrorMarkedState(false);
	}

	const onPublishAdClick = () => {
		if (adTitleInputRef.current.value.length === 0)
		{
			setAdTitleInputErrorMarkedState(true);
			notificationContext.addNotificationError("Заголовок не был введён");
			return;
		}

		if (adPriceInputRef.current.value.length === 0)
		{
			setAdPriceInputErrorMarkedState(true);
			notificationContext.addNotificationError("Цена не была введена");
			return;
		}

		addNewAd({ userId: authContext.userData.id, title: adTitleInputRef.current.value, description: adDescriptionInputRef.current.value,
			price: adPriceInputRef.current.value }).then((result) => {
					if (result.status === 201)
					{
						notificationContext.addNotification("Объявление было добавлено");
						onCloseAddAdDialogWindowClick();
					}
					else
					{
						notificationContext.addNotificationError(result.data.error);
					}
				});
	};

	useEffect(() => {
			if (isAddAdDialogWndVisible === true)
			{
				adPriceInputRef.current.value = 0;
			}
		}, [isAddAdDialogWndVisible]);


	return (
		<React.Fragment>
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
								<ButtonSecondary onClick={ onShowAddAdDialogWindowClick }>Разместить объявление</ButtonSecondary>
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
			</HeaderBase>

			{
				(isAddAdDialogWndVisible == true) &&
					(
						<ForegroundBase>
							<DialogWindowBase>
								<DialogWindowHeader title="Новое объявление" closeFunc={ onCloseAddAdDialogWindowClick }/>
								<DialogWindowRegularText style={ { marginTop: "10px" } }>Название</DialogWindowRegularText>
								<InputDefault placeholder="Введите название" style={ { marginTop: "4px", width: "500px" } } ref={ adTitleInputRef }
									onInput={ onAdTitleInputInput } isErrorMarked={ isAdTitleInputErrorMarked }/>
								<DialogWindowRegularText style={ { marginTop: "20px" } }>Описание</DialogWindowRegularText>
								<TextBoxDefault placeholder="Введите описание" style={ { marginTop: "4px", width: "500px", height: "200px" } } ref={ adDescriptionInputRef }/>
								
								<PhotoBlockHeaderSpan style={ { marginTop: "20px" } }>
									<DialogWindowRegularText>Фотографии товара</DialogWindowRegularText>
									<SpanSecondaryText>не более 5 фотографий</SpanSecondaryText>
								</PhotoBlockHeaderSpan>
								<PhotoPreviewList>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
								</PhotoPreviewList>
								
								<DialogWindowRegularText style={ { marginTop: "30px" } }>Цена</DialogWindowRegularText>
								<PriceInputSpan style={ { marginTop: "4px", width: "200px" } } isErrorMarked={ isAdPriceInputErrorMarked }>
									<PriceInputCustomInput ref={ adPriceInputRef } onKeyDown={ onAdPriceInputKeyDown } onInput={ onAdPriceInputInput }/>
									<PriceInputSymbol>₽</PriceInputSymbol>
								</PriceInputSpan>
								<ButtonDefaultColoured onClick={ onPublishAdClick } style={ { marginTop: "30px" } }>Опубликовать</ButtonDefaultColoured>
							</DialogWindowBase>
						</ForegroundBase>)
			}
		</React.Fragment>);
}
