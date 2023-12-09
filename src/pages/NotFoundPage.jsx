import React, { useEffect } from "react";
import { CenteredViewBase, DialogBase } from "../styles/PageStyles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonDefaultColoured, ButtonDefaultTransparent } from "../components/Button";
import { InputMinimal } from "../components/Input";


const LogoImg = styled.img`
	width: fit-content;
	height: 21px;
`;

const NotFoundTextH1 = styled.h1`
	font-weight: 400;
	font-size: 160px;
	line-height: 168px;
`;

const NotFoundTextH2 = styled.h2`
	font-weight: 400;
	font-size: 32px;
	line-height: 40px;
`;



export default function NotFoundPage() {
	useEffect(() => {
			document.body.style.backgroundColor = "#F0F0F0";
		});

	return (
		<CenteredViewBase>
			<DialogBase>
				<Link to="/">
					<LogoImg src="/img/skypro-logo-dark.png"></LogoImg>
				</Link>
				<NotFoundTextH1 style={ { marginTop: "30px" } }>404</NotFoundTextH1>
				<NotFoundTextH2  style={ { marginTop: "4px" } }>Страница не найдена</NotFoundTextH2>
				<Link to="/" style={ { marginTop: "36px" } }>
					<ButtonDefaultColoured>Вернуться на главную</ButtonDefaultColoured>
				</Link>
			</DialogBase>
		</CenteredViewBase>);
}