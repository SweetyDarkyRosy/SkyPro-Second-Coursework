import styled from "styled-components";


export const ButtonAbstract = styled.button`
	border-radius: 6px;

	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	cursor: pointer;
`;

export const ButtonDefaultColoured = styled(ButtonAbstract)`
	padding: 13px 37px;

	min-height: 50px;

	background-color: #009EE4;
	border: none;

	color: #FFFFFF;

	&:hover {
		background-color: #0080C1;
	}

	&:disabled {
		background-color: #D9D9D9;
	}
`

export const ButtonDefaultTransparent = styled(ButtonAbstract)`
	padding: 13px 37px;

	min-height: 50px;

	background-color: transparent;
	border: solid 1px #D9D9D9;

	color: #000000;

	&:hover {
		background-color: #009EE426;
		border: solid 1px #009EE4;
	}

	&:disabled {
		background-color: #D9D9D9;
		border: solid 1px #000000;
	}
`

export const ButtonSecondary = styled(ButtonAbstract)`
	padding: 8px 24px;

	min-height: 40px;

	background-color: transparent;
	border: solid 1px #FFFFFF;

	color: #FFFFFF;

	&:hover {
		background-color: #FFFFFF26;
	}
`;
