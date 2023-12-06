import styled from "styled-components";
import { ButtonMinimal } from "./Button";


const HeaderBase = styled.div`
	padding: 20px 0;

	width: 100vw;

	background-color: #009EE4;
`;

const ButtonBlock = styled.div`
	margin: 0 140px;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	gap: 10px;
`


export function Header() {
	return (
		<HeaderBase>
			<ButtonBlock>
				<ButtonMinimal>Разместить объявление</ButtonMinimal>
				<ButtonMinimal>Личный кабинет</ButtonMinimal>
			</ButtonBlock>
		</HeaderBase>);
}
