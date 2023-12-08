import styled from "styled-components";


export const ButtonAbstract = styled.button`
	border-radius: 6px;

	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	cursor: pointer;
`;

export const ButtonDefault = styled(ButtonAbstract)`
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

export const ButtonMinimal = styled(ButtonAbstract)`
	padding: 8px 24px;

	min-height: 40px;

	background-color: transparent;
	border: solid 1px #FFFFFF;

	color: #FFFFFF;

	&:hover {
		background-color: #FFFFFF26;
	}
`;
