import styled from "styled-components";
import { DialogWindowHeadText } from "../styles/ForegroundStyles";


const DialogWindowHeaderBase = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 50px;
`;

const DialogWindowHeaderCloseButtonImage = styled.svg`
	width: 46px;
	height: 46px;

	stroke: #D9D9D9;

	cursor: pointer;

	&:hover {
		stroke: #009EE4;
	}
`;


export default function DialogWindowHeader({ title, closeFunc }) {
	return (
		<DialogWindowHeaderBase>
			<DialogWindowHeadText>{ title }</DialogWindowHeadText>
			<DialogWindowHeaderCloseButtonImage onClick={ closeFunc }>
				<use xlinkHref="/img/close-button.svg#close-button"/>
			</DialogWindowHeaderCloseButtonImage>
		</DialogWindowHeaderBase>)
}
