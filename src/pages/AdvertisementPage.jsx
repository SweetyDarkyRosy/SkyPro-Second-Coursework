import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "@fontsource/noto-sans";
import { Header } from "../components/Header";
import { Centered, SectionDefault, SectionName } from "../styles/PageStyles";
import ReturnBar from "../components/ReturnBar";
import { PhotoPreviewStatic, PhotoPreviewList } from "../components/PhotoPreview";
import { DialogWindowBase, DialogWindowRegularText, DialogWindowSpecialText, ForegroundBase } from "../styles/ForegroundStyles";
import DialogWindowHeader from "../components/DialogWindowHeader";
import { ButtonDefaultColoured } from "../components/Button";
import { TextBoxDefault } from "../components/Input";


const RegularText = styled.p`
	color: #000000;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	text-align: left;
`

const AdTab = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 60px;
`;

const AdPhotoBlock = styled.div`
	min-width: 480px;
	width: 480px;
	height: fit-content;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: normal;
`;

const AdPhoto = styled.img`
	width: 100%;
	height: fit-content;

	background-color: #F0F0F0;
	border: none;
`;

const InfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`

const AdName = styled.h1`
	color: #000000;
	font-weight: 700;
	font-size: 32px;
	line-height: 44.8px;
	text-align: left;
`;

const AdAddInfoRegularText = styled.p`
	font-family: Noto Sans;

	color: #5F5F5F;
	font-weight: 400;
	font-size: 16px;
	line-height: 20.8px;
	text-align: left;
`;

const AdClickableText = styled(AdAddInfoRegularText)`
	color: #009EE4;

	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const AdPriceText = styled.p`
	font-family: Noto Sans;

	color: #000000;
	font-weight: 700;
	font-size: 28px;
	line-height: 39.2px;
	text-align: left;
`;

const AuthorBlock = styled.div`
	margin-top: 34px;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 18px;
`;

const AuthorAvatarImg = styled.img`
	width: 40px;
	height: 40px;
`;

const AuthorInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const AuthorInfoNameClickableText = styled.div`
	font-family: Noto Sans;

	color: #009EE4;
	font-weight: 600;
	font-size: 20px;
	line-height: 26px;
	text-align: left;

	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const ReviewBlock = styled.div`
	max-height: 60vh;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	overflow-y: auto;
`;

const ReviewBase = styled.div`
	margin-top: 30px;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 12px;
`;

const CommentBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const ReviewHeaderSpan = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;

const SpanSecondaryText = styled.p`
	color: #0000004D;
	font-weight: 400;
	font-size: 16px;
	line-height: 32px;
`;

export const CommentLabel = styled.p`
	color: #000000;
	font-weight: 600;
	font-size: 16px;
	line-height: 32px;
	text-align: left;
`


export default function AdvertisementPage() {
	const [ isWndWithPhoneVisible, toggleWndWithPhoneVisibility ] = useState(false);
	const [ isReviewDialogWndVisible, setReviewDialogWndVisibility ] = useState(false);
	
	
	const onShowPhoneWindowClick = () => {
		toggleWndWithPhoneVisibility(true);
	}

	const onClosePhoneDialogWindowClick = () => {
		toggleWndWithPhoneVisibility(false);
	}

	const onShowReviewDialogWindowClick = () => {
		setReviewDialogWndVisibility(true);
	}

	const onCloseReviewDialogWindowClick = () => {
		setReviewDialogWndVisibility(false);
	}

	useEffect(() => {
		document.body.style.backgroundColor = "#FFFFFF";
	});


	return (
		<React.Fragment>
			<Header/>
			<Centered>
				<ReturnBar/>
				<SectionDefault>
					<AdTab>
						<AdPhotoBlock>
							<AdPhoto style={ { height: "400px" } }/>
							<PhotoPreviewList>
								<PhotoPreviewStatic/>
								<PhotoPreviewStatic/>
								<PhotoPreviewStatic/>
								<PhotoPreviewStatic/>
								<PhotoPreviewStatic/>
							</PhotoPreviewList>
						</AdPhotoBlock>
						<InfoBlock>
							<AdName>Just some add... Just some add... Just some add... Just some add...</AdName>
							<AdAddInfoRegularText style={ { marginTop: "10px" }}>DATE</AdAddInfoRegularText>
							<AdAddInfoRegularText style={ { marginTop: "4px" }}>CITY</AdAddInfoRegularText>
							<AdClickableText style={ { marginTop: "4px" }} onClick={ onShowReviewDialogWindowClick }>23 отзыва</AdClickableText>
							<AdPriceText style={ { marginTop: "34px" } }>2 200 ₽</AdPriceText>
							<ButtonDefaultColoured onClick={ onShowPhoneWindowClick } style={ { marginTop: "20px" } }>Показать телефон<br/>8 905 ХХХ ХХ ХХ</ButtonDefaultColoured>
							<AuthorBlock>
								<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
								<AuthorInfoBlock>
									<Link to="/profile/352" style={ { textDecoration: 'none' } }>
										<AuthorInfoNameClickableText>NAME</AuthorInfoNameClickableText>
									</Link>
									<AdAddInfoRegularText>DATE</AdAddInfoRegularText>
								</AuthorInfoBlock>
							</AuthorBlock>

							{
								(isWndWithPhoneVisible == true) &&
									(
										<ForegroundBase>
											<DialogWindowBase>
												<DialogWindowHeader title="Телефон продавца" closeFunc={ onClosePhoneDialogWindowClick }/>
												<DialogWindowSpecialText>8 905 ХХХ ХХ ХХ</DialogWindowSpecialText>
											</DialogWindowBase>
										</ForegroundBase>)
							}
						</InfoBlock>
					</AdTab>
				</SectionDefault>
				<SectionDefault>
					<SectionName>Описание товара</SectionName>
					<RegularText style={ { width: "70%" } }>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						 veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
						 commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
						 esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						 non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</RegularText>
				</SectionDefault>
			</Centered>

			{
				(isReviewDialogWndVisible == true) &&
					(
						<ForegroundBase>
							<DialogWindowBase>
								<DialogWindowHeader title="Отзывы о товаре" closeFunc={ onCloseReviewDialogWindowClick }/>
								<ReviewBlock>
									<DialogWindowRegularText style={ { marginTop: "10px" } }>Добавить отзыв</DialogWindowRegularText>
									<TextBoxDefault placeholder="Введите описание" style={ { marginTop: "14px", width: "500px", height: "100px" } }/>
									<ButtonDefaultColoured style={ { marginTop: "14px" } }>Опубликовать</ButtonDefaultColoured>
								
									<ReviewBase>
										<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
										<CommentBlock>
											<ReviewHeaderSpan>
												<DialogWindowRegularText>NAME</DialogWindowRegularText>
												<SpanSecondaryText>DATE</SpanSecondaryText>
											</ReviewHeaderSpan>
											<CommentLabel style={ { marginTop: "12px" } }>Комментарий</CommentLabel>
											<DialogWindowRegularText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
												tempor incididunt ut labore et dolore magna aliqua. </DialogWindowRegularText>
										</CommentBlock>
									</ReviewBase>

									<ReviewBase>
										<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
										<CommentBlock>
											<ReviewHeaderSpan>
												<DialogWindowRegularText>NAME</DialogWindowRegularText>
												<SpanSecondaryText>DATE</SpanSecondaryText>
											</ReviewHeaderSpan>
											<CommentLabel style={ { marginTop: "12px" } }>Комментарий</CommentLabel>
											<DialogWindowRegularText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
												tempor incididunt ut labore et dolore magna aliqua. </DialogWindowRegularText>
										</CommentBlock>
									</ReviewBase>

									<ReviewBase>
										<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
										<CommentBlock>
											<ReviewHeaderSpan>
												<DialogWindowRegularText>NAME</DialogWindowRegularText>
												<SpanSecondaryText>DATE</SpanSecondaryText>
											</ReviewHeaderSpan>
											<CommentLabel style={ { marginTop: "12px" } }>Комментарий</CommentLabel>
											<DialogWindowRegularText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
												tempor incididunt ut labore et dolore magna aliqua. </DialogWindowRegularText>
										</CommentBlock>
									</ReviewBase>

									<ReviewBase>
										<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
										<CommentBlock>
											<ReviewHeaderSpan>
												<DialogWindowRegularText>NAME</DialogWindowRegularText>
												<SpanSecondaryText>DATE</SpanSecondaryText>
											</ReviewHeaderSpan>
											<CommentLabel style={ { marginTop: "12px" } }>Комментарий</CommentLabel>
											<DialogWindowRegularText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
												tempor incididunt ut labore et dolore magna aliqua. </DialogWindowRegularText>
										</CommentBlock>
									</ReviewBase>

									<ReviewBase>
										<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
										<CommentBlock>
											<ReviewHeaderSpan>
												<DialogWindowRegularText>NAME</DialogWindowRegularText>
												<SpanSecondaryText>DATE</SpanSecondaryText>
											</ReviewHeaderSpan>
											<CommentLabel style={ { marginTop: "12px" } }>Комментарий</CommentLabel>
											<DialogWindowRegularText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
												tempor incididunt ut labore et dolore magna aliqua. </DialogWindowRegularText>
										</CommentBlock>
									</ReviewBase>
								</ReviewBlock>
							</DialogWindowBase>
						</ForegroundBase>)
			}
		</React.Fragment>
	)
}
