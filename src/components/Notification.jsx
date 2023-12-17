import styled from "styled-components";


const NotificationBase = styled.div`
	width: 100%;
	height: 30px;

	display: block;

	background-color: ${ props => (props.isError ? '#9E000026': '#009EE426') };
	border: ${ props => (props.isError ? 'solid 1px #9E0000': 'solid 1px #009EE4') };
	border-radius: 6px;
`;

const NotificationText = styled.p`
	height: 100%;

	color: #000000;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	text-align: center;
`;


export function Notification({ text, isError }) {
	return (
		<NotificationBase isError={ isError }>
			<NotificationText>{ text }</NotificationText>
		</NotificationBase>)
}
