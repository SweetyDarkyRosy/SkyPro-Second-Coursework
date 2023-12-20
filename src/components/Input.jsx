import React from "react";
import styled from "styled-components";


export const InputDefault = styled.input`
	padding: 13px 19px;

	height: 50px;

	box-sizing: border-box;

	border-radius: 6px;
	border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #00000033') };

	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	&:focus {
		border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #009EE4') };
		outline: none;
	}
`;

export const InputMinimal = styled.input`
	padding: 8px 0;

	width: 278.5px;

	background-color: transparent;
	border: ${ props => (props.isErrorMarked ? '2px solid #9E0000': 'none') };
	border-bottom: ${ props => (props.isErrorMarked ? '': '1px solid #D0CECE') };

	color: #000000;
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;

	&::-webkit-input-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	&:-ms-input-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	&:-moz-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	&::placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}
`;

export const TextBoxDefault = styled.textarea`
	padding: 13px 19px;

	height: 50px;

	box-sizing: border-box;

	border-radius: 6px;
	border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #00000033') };

	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	resize: none;

	&:focus {
		border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #009EE4') };
		outline: none;
	}
`;
