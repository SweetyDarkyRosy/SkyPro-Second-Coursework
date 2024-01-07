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

	cursor: pointer;
`;

const PhotoPreviewEmptyBlock = styled.div`
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


export function PhotoPreviewDynamic({ imageData, setImageDataFunc, initImageUrl }) {
	const onImageUpload = (event) => {
		setImageDataFunc(event.target.files[0]);
	}

	return (
		<PhotoPreviewBase>
			{
				(imageData != null) ?
					(
						<PhotoPreviewImg src={ URL.createObjectURL(imageData) }/>) :
					(
						((initImageUrl !== "") && (initImageUrl !== undefined)) ?
							(<PhotoPreviewImg src={ initImageUrl }/>) :
							(
								<PhotoPreviewEmptyBlock>
									<PhotoPreviewDynamicCrossImg>
										<use xlinkHref="/img/cross.svg#cross"/>
									</PhotoPreviewDynamicCrossImg>
								</PhotoPreviewEmptyBlock>)
					)
			}
			<PhotoPreviewInput type="file" onChange={ onImageUpload }/>
		</PhotoPreviewBase>)
}

export function PhotoPreviewStatic({ imageUrl, onClick, imageId }) {
	return (
		<PhotoPreviewBase>
			{
				(imageUrl !== "") ?
					<PhotoPreviewImg src={ imageUrl } onClick={ onClick } imageId={ imageId }/> :
					<PhotoPreviewEmptyBlock/>
			}
		</PhotoPreviewBase>)
}
