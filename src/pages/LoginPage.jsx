import React, { useEffect, useRef, useState } from "react";
import { CenteredViewBase, DialogBase } from "../styles/PageStyles";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ButtonDefaultColoured, ButtonDefaultTransparent } from "../components/Button";
import { InputMinimal } from "../components/Input";
import { useAuthContext } from "../authContext";
import { LogIn } from "../api";
import { useNotificationContext } from "../notificationContext";


const LogoImg = styled.img`
	width: fit-content;
	height: 21px;
`;


export default function LoginPage() {
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const notificationContext = useNotificationContext();

	const eMailInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	const [ isEMailInputErrorMarked, setEMailInputErrorMarkedState ] = useState(false);
	const [ isPasswordInputErrorMarked, setPasswordInputErrorMarkedState ] = useState(false);

	const onEMailInputInput = () => {
		setEMailInputErrorMarkedState(false);
	}

	const onPasswordInputInput = () => {
		setPasswordInputErrorMarkedState(false);
	}

	const onLoginClick = () => {
		if (eMailInputRef.current.value.length === 0)
		{
			setEMailInputErrorMarkedState(true);
			notificationContext.addNotificationError("E-Mail не был введён");
			return;
		}

		if (passwordInputRef.current.value.length === 0)
		{
			setPasswordInputErrorMarkedState(true);
			notificationContext.addNotificationError("Пароль не был введён");
			return;
		}

		LogIn({ eMail: eMailInputRef.current.value, password: passwordInputRef.current.value }).then((result) => {
				if (result.status === 201)
				{
					authContext.setUserData(result.data.body);

					notificationContext.addNotification("Вход в аккаунт был совершён успешно");

					navigate("/profile", { replace: true });
				}
				else
				{
					notificationContext.addNotificationError(result.data.error);
				}
			});
	};


	useEffect(() => {
			document.body.style.backgroundColor = "#F0F0F0";
		});


	return (
		<CenteredViewBase>
			<DialogBase>
				<Link to="/">
					<LogoImg src="/img/skypro-logo-dark.png"></LogoImg>
				</Link>
				<InputMinimal placeholder="Email" style={ { marginTop: "34px" } } ref={ eMailInputRef } onInput={ onEMailInputInput }
					isErrorMarked={ isEMailInputErrorMarked }/>
				<InputMinimal placeholder="Пароль" type="password" style={ { marginTop: "30px" } } ref={ passwordInputRef }
					onInput={ onPasswordInputInput } isErrorMarked={ isPasswordInputErrorMarked }/>
				<ButtonDefaultColoured onClick={ onLoginClick } style={ { marginTop: "60px", width: "278px" } }>Войти</ButtonDefaultColoured>
				<Link to="/register" style={ { marginTop: "20px" } }>
					<ButtonDefaultTransparent style={ { width: "278px" } }>Зарегистрироваться</ButtonDefaultTransparent>
				</Link>
			</DialogBase>
		</CenteredViewBase>);
}