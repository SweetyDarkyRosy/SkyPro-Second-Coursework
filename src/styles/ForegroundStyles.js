import styled from "styled-components";


export const ForegroundBase = styled.div`
	width: 100%;
	height: 100%;

	z-index: 150;
	position: fixed;
	top: 0px;
	left: 0px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #C4C4C4D1;
`

export const DialogWindowBase = styled.div`
	padding: 20px 50px 56px 50px;

	background-color: #FFFFFF;
	border-radius: 12px
`

export const DialogWindowHeadText = styled.h2`
	color: #000000;
	font-weight: 500;
	font-size: 32px;
	line-height: 70.4px;
	text-align: left;
`

export const DialogWindowRegularText = styled.p`
	color: #000000;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	text-align: left;
`

export const DialogWindowSpecialText = styled.p`
	color: #009EE4;
	font-weight: 500;
	font-size: 22px;
	line-height: 26.4px;
	text-align: center;
`
