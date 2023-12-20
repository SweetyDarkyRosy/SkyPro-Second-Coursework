import React, { useRef, useState } from "react";
import styled from "styled-components";


export const PhotoPreviewList = styled.div`
	margin-top: 10px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const PhotoPreviewBase = styled.div`
	width: 90px;
	height: 90px;

	position: relative;

	stroke: #D9D9D9;

	&:hover {
		stroke: #009EE4;
	}
`;

const PhotoPreviewInput = styled.input`
	width: 90px;
	height: 90px;

	position: absolute;
	left: 0;
	top: 0;

	color: transparent;

	&::file-selector-button {
		width: 90px;
		height: 90px;

		background-color: transparent;
		border: none;

		color: transparent;
	}

	cursor: pointer;
`;

const PhotoPreviewImg = styled.img`
	width: 100%;
	height: 100%;
`;

const PhotoPreviewDynamicInnerDiv = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #F0F0F0;
`;

const PhotoPreviewDynamicCrossImg = styled.svg`
	width: 46px;
	height: 46px;

	rotate: 45deg;
`;

const PhotoPreviewStaticInnerDiv = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #F0F0F0;

	cursor: pointer;
`;


export function PhotoPreviewDynamic({ photoUrl }) {
	const [ imageData, setImageData ] = useState(null);

	const onImageUpload = (event) => {
		setImageData(event.target.files[0]);
	}

	return (
		<PhotoPreviewBase>
			{
				(imageData != null) ?
					(
						<PhotoPreviewImg src={ URL.createObjectURL(imageData) }/>) :
					(
						<PhotoPreviewDynamicInnerDiv>
							<PhotoPreviewDynamicCrossImg>
								<use xlinkHref="/img/cross.svg#cross"/>
							</PhotoPreviewDynamicCrossImg>
						</PhotoPreviewDynamicInnerDiv>
					)
			}
			<PhotoPreviewInput type="file" onChange={ onImageUpload }/>
		</PhotoPreviewBase>)
}

export function PhotoPreviewStatic({ photoUrl }) {
	return (
		<PhotoPreviewBase>
			{
				((photoUrl != undefined) && (photoUrl === "")) ?
					<PhotoPreviewImg src="photoUrl"/> :
					<PhotoPreviewStaticInnerDiv/>
			}
		</PhotoPreviewBase>)
}
