import styled from "styled-components";


export const ButtonAbstract = styled.button`
	border-radius: 6px;

	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
`;

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
