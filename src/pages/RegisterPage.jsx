import React, { useEffect, useRef, useState } from "react";
import { CenteredViewBase, DialogBase } from "../styles/PageStyles";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ButtonDefaultColoured } from "../components/Button";
import { InputMinimal } from "../components/Input";
import { registerNewUser } from "../api";


const LogoImg = styled.img`
	width: fit-content;
	height: 21px;
`;


export default function RegisterPage() {
	const navigate = useNavigate();

	const eMailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const repeatedPasswordInputRef = useRef(null);
	const userNameInputRef = useRef(null);
	const phoneNumberInputRef = useRef(null);
	const userSurnameInputRef = useRef(null);
	const townInputRef = useRef(null);

	const [ isEMailInputErrorMarked, setEMailInputErrorMarkedState ] = useState(false);
	const [ isPasswordInputErrorMarked, setPasswordInputErrorMarkedState ] = useState(false);
	const [ isRepeatedPasswordInputErrorMarked, setRepeatedPasswordInputErrorMarkedState ] = useState(false);
	const [ isUserNameInputErrorMarked, setUserNameInputErrorMarkedState ] = useState(false);
	const [ isPhoneNumberInputErrorMarked, setPhoneNumberInputErrorMarkedState ] = useState(false);

	const onEMailInputInput = () => {
		setEMailInputErrorMarkedState(false);
	}

	const onPasswordInputInput = () => {
		setPasswordInputErrorMarkedState(false);
	}

	const onRepeatedPasswordInputInput = () => {
		setRepeatedPasswordInputErrorMarkedState(false);
	}

	const onUserNameInputInput = () => {
		setUserNameInputErrorMarkedState(false);
	}

	const onPhoneNumberInputInput = () => {
		setPhoneNumberInputErrorMarkedState(false);
	}

	const onRegisterClick = () => {
		if (eMailInputRef.current.value.length === 0)
		{
			setEMailInputErrorMarkedState(true);
			return;
		}

		if (passwordInputRef.current.value.length === 0)
		{
			setPasswordInputErrorMarkedState(true);
			return;
		}

		if (repeatedPasswordInputRef.current.value.length === 0)
		{
			setRepeatedPasswordInputErrorMarkedState(true);
			return;
		}

		if (passwordInputRef.current.value !== repeatedPasswordInputRef.current.value)
		{
			setPasswordInputErrorMarkedState(true);
			setRepeatedPasswordInputErrorMarkedState(true);

			return;
		}

		if (userNameInputRef.current.value.length === 0)
		{
			setUserNameInputErrorMarkedState(true);
			return;
		}

		if (phoneNumberInputRef.current.value.length === 0)
		{
			setPhoneNumberInputErrorMarkedState(true);
			return;
		}

		registerNewUser({ eMail: eMailInputRef.current.value, password: passwordInputRef.current.value,
			name: userNameInputRef.current.value, surname: userSurnameInputRef.current.value,
			phoneNumber: phoneNumberInputRef.current.value, town: townInputRef.current.value }).then((result) => {
					if (result.status === 201)
					{
						navigate("/login", { replace: true });
					}
					else
					{
						console.error(result.data.error);
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
				<InputMinimal placeholder="Повторите пароль" type="password" style={ { marginTop: "30px" } } ref={ repeatedPasswordInputRef }
					onInput={ onRepeatedPasswordInputInput } isErrorMarked={ isRepeatedPasswordInputErrorMarked }/>
				<InputMinimal placeholder="Имя" style={ { marginTop: "30px" } } ref={ userNameInputRef }
					onInput={ onUserNameInputInput } isErrorMarked={ isUserNameInputErrorMarked }/>
				<InputMinimal placeholder="Фамилия (необязательно)" style={ { marginTop: "30px" } } ref={ userSurnameInputRef }/>
				<InputMinimal placeholder="Телефон" style={ { marginTop: "30px" } } ref={ phoneNumberInputRef }
					onInput={ onPhoneNumberInputInput } isErrorMarked={ isPhoneNumberInputErrorMarked }/>
				<InputMinimal placeholder="Город (необязательно)" style={ { marginTop: "30px" } } ref={ townInputRef }/>
				<ButtonDefaultColoured onClick={ onRegisterClick } style={ { marginTop: "60px", width: "278px" } }>Зарегистрироваться</ButtonDefaultColoured>
			</DialogBase>
		</CenteredViewBase>);
}