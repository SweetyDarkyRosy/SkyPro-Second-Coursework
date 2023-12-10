import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonDefaultColoured } from "./Button";
import { InputDefault } from "./Input";


const SearchBarBase = styled.div`
	margin-top: 42px;

	width: 100%;

	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const SearchBarLogoImg = styled.img`
	width: fit-content;
	height: 38px;
`;


export default function ReturnBar() {
	return (
		<SearchBarBase>
			<SearchBarLogoImg src="/img/skypro-logo-symbol.svg" style={ { marginRight: "60px" } }/>
			<Link to="/">
				<ButtonDefaultColoured style={ { marginLeft: "10px" } }>Вернуться на главную</ButtonDefaultColoured>
			</Link>
		</SearchBarBase>);
}
