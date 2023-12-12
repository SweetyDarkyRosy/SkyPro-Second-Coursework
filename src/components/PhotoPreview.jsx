import React from "react";
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

	stroke: #D9D9D9;

	cursor: pointer;

	&:hover {
		stroke: #009EE4;
	}
`;


export default function PhotoPreviewDynamic({ photoUrl }) {
	return (
		<PhotoPreviewBase>
			{
				((photoUrl != undefined) && (photoUrl === "")) ?
					(
						<PhotoPreviewImg src="photoUrl"/>) :
					(
						<PhotoPreviewDynamicInnerDiv>
							<PhotoPreviewDynamicCrossImg>
								<use xlinkHref="/img/cross.svg#cross"/>
							</PhotoPreviewDynamicCrossImg>
						</PhotoPreviewDynamicInnerDiv>
					)
			}
		</PhotoPreviewBase>)
}
