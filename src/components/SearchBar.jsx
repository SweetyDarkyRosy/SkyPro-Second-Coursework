import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonDefaultColoured } from "./Button";
import { InputDefault } from "./Input";


const SearchBarBase = styled.div`
	margin-top: 42px;

	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SearchBarLogoImg = styled.img`
	width: fit-content;
	height: 38px;
`;


export default function SearchBar() {
	return (
		<SearchBarBase>
			<Link to="/">
				<SearchBarLogoImg src="/img/skypro-logo-symbol.svg" style={ { marginRight: "60px" } }/>
			</Link>
			<InputDefault placeholder="Поиск по объявлениям" style={ { width: "100%" } }/>
			<ButtonDefaultColoured style={ { marginLeft: "10px" } }>Найти</ButtonDefaultColoured>
		</SearchBarBase>);
}
