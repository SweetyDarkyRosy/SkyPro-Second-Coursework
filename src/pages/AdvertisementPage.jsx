import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@fontsource/noto-sans";
import { Header } from "../components/Header";
import { Centered, SectionDefault, SectionName } from "../styles/PageStyles";
import ReturnBar from "../components/ReturnBar";
import { PhotoPreviewStatic, PhotoPreviewList, PhotoPreviewDynamic } from "../components/PhotoPreview";
import { DialogWindowBase, DialogWindowRegularText, DialogWindowSpecialText, ForegroundBase } from "../styles/ForegroundStyles";
import DialogWindowHeader from "../components/DialogWindowHeader";
import { ButtonDefaultColoured } from "../components/Button";
import { InputDefault, TextBoxDefault } from "../components/Input";
import { addComment, deleteAd, getAd, getUserData, updateAd } from "../api";
import { useNotificationContext } from "../notificationContext";
import { useAuthContext } from "../authContext";
import { Review } from "../components/Review";


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
	padding: 4px 20px 4px 0;

	width: fit-content;
	max-height: 60vh;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	overflow-x: hidden;
	overflow-y: auto;
`;

export const ControlButtonGroupDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;

const PhotoBlockHeaderSpan = styled.span`
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
	line-height: 24px;
`;

const PriceInputSpan = styled.span`
	padding: 13px 19px;

	height: 50px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 4px;

	box-sizing: border-box;

	border-radius: 6px;
	border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #00000033') };

	&:focus-within {
		border: ${ props => (props.isErrorMarked ? 'solid 1px #9E0000': 'solid 1px #009EE4') };
	}
`;

export const PriceInputCustomInput = styled.input`
	width: 100%;

	border: none;

	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	&:focus {
		outline: none;
	}
`;

const PriceInputSymbol = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
`


export default function AdvertisementPage() {
	const pageParams = useParams();
	const navigate = useNavigate();
	const authContext = useAuthContext();
	const notificationContext = useNotificationContext();

	const [ adData, setAdData ] = useState(null);
	const [ authorData, setAuthorData] = useState(null);

	const [ adCreationDateAndTime, setAdCreationDateAndTime ] = useState("");
	const [ authorAccountCreationDateAndTime, setAuthorAccountCreationDateAndTime ] = useState("");

	const [ isWndWithPhoneVisible, toggleWndWithPhoneVisibility ] = useState(false);
	const [ isReviewDialogWndVisible, setReviewDialogWndVisibility ] = useState(false);
	
	const commentInputRef = useRef(null);

	const [ isCommentInputErrorMarked, setIsCommentInputErrorMarkedState ] = useState(false);

	const adTitleInputRef = useRef(null);
	const adDescriptionInputRef = useRef(null);
	const adPriceInputRef = useRef(null);

	const [ isEditingDialogWndVisible, setEditingDialogWndVisibility ] = useState(false);

	const [ isAdTitleInputErrorMarked, setAdTitleInputErrorMarkedState ] = useState(false);
	const [ isAdPriceInputErrorMarked, setAdPriceInputErrorMarkedState ] = useState(false);
	
	
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

		setIsCommentInputErrorMarkedState(false);
	}

	const onCommentInputInput = () => {
		setIsCommentInputErrorMarkedState(false);
	}

	const onPublichReviewClick = () => {
		if (commentInputRef.current.value.length === 0)
		{
			setIsCommentInputErrorMarkedState(true);
			notificationContext.addNotificationError("Комментарий не был введён");
			return;
		}

		if (authContext.userData == null)
		{
			notificationContext.addNotificationError("Вы не авторизованы");
			return;
		}

		addComment({ userId: authContext.userData.id, adId: adData._id, comment: commentInputRef.current.value }).then((result) => {
				if (result.status === 201)
				{
					notificationContext.addNotification("Комментарий был опубликован");
					updateAdData();
				}
				else
				{
					notificationContext.addNotificationError(result.data.error);
				}
			});
	}

	const onDeleteAdClick = () => {
		deleteAd({ id: adData._id }).then((result) => {
				if (result.status === 202)
				{
					notificationContext.addNotification("Объявление было удалено");
					navigate("/", { replace: true });
				}
				else
				{
					notificationContext.addNotificationError(result.data.error);
				}
			});
	}

	const onShowEditingDialogWindowClick = () => {
		setEditingDialogWndVisibility(true);
	}

	const onCloseEditingDialogWindowClick = () => {
		setEditingDialogWndVisibility(false);

		setAdTitleInputErrorMarkedState(false);
		setAdPriceInputErrorMarkedState(false);
	}

	const onAdTitleInputInput = () => {
		setAdTitleInputErrorMarkedState(false);
	}

	const onAdPriceInputKeyDown = (event) => {
		if ((isNaN(event.key) === true) && (event.key !== "Backspace"))
		{
			event.preventDefault();
		}
	}

	const onAdPriceInputInput = () => {
		setAdPriceInputErrorMarkedState(false);
	}

	const onSaveAdChangesClick = () => {
		if (adTitleInputRef.current.value.length === 0)
		{
			setAdTitleInputErrorMarkedState(true);
			notificationContext.addNotificationError("Заголовок не был введён");
			return;
		}

		if (adPriceInputRef.current.value.length === 0)
		{
			setAdPriceInputErrorMarkedState(true);
			notificationContext.addNotificationError("Цена не была введена");
			return;
		}

		updateAd({ id: pageParams.id, title: adTitleInputRef.current.value, description: adDescriptionInputRef.current.value,
			price: adPriceInputRef.current.value }).then((result) => {
					if (result.status === 201)
					{
						notificationContext.addNotification("Объявление было обновлено");

						onCloseEditingDialogWindowClick();
						updateAdData();
					}
					else
					{
						notificationContext.addNotificationError(result.data.error);
					}
				});
	}

	const formatAdDateAndTime = () => {
		const createdTimeAndDate = new Date(adData.created);
		const createdDate = createdTimeAndDate.getDate();

		const currTimeAndDate = new Date();

		const dayDelta = currTimeAndDate.getDate() - createdDate;
		const monthDelta = currTimeAndDate.getMonth() - createdTimeAndDate.getMonth();
		const yearDelta = currTimeAndDate.getFullYear() - createdTimeAndDate.getFullYear();

		let dateAndTimeText;

		if ((dayDelta === 0) && (monthDelta === 0) && (yearDelta === 0))
		{
			dateAndTimeText = "Сегодня";
		}
		else if ((dayDelta === 1) && (monthDelta === 0) && (yearDelta === 0))
		{
			dateAndTimeText = "Вчера";
		}
		else
		{
			dateAndTimeText = (String(createdTimeAndDate.getDate()).padStart(2, "0") + '.' +
				String(createdTimeAndDate.getMonth() + 1).padStart(2, "0") + '.' +
				String(createdTimeAndDate.getFullYear())).padStart(2, "0");
		}

		dateAndTimeText += ', ';
		dateAndTimeText += String(createdTimeAndDate.getHours()).padStart(2, "0") + ':' +
			String(createdTimeAndDate.getMinutes()).padStart(2, "0") + ':' +
			String(createdTimeAndDate.getSeconds()).padStart(2, "0");

		setAdCreationDateAndTime(dateAndTimeText);
	}

	const formatAuthorDateAndTime = () => {
		const months = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
			'октября', 'ноября', 'декабря' ];

		const createdTimeAndDate = new Date(adData.created);

		let dateAndTimeText = 'Продаёт товары с ';
		dateAndTimeText += months[createdTimeAndDate.getMonth()];
		dateAndTimeText += ' ';
		dateAndTimeText += createdTimeAndDate.getFullYear();

		setAuthorAccountCreationDateAndTime(dateAndTimeText);
	}

	const updateAdData = () => {
		getAd({ id: pageParams.id }).then((result) => {
				if (result.status === 200)
				{
					setAdData(result.data.body);

					getUserData({ id: result.data.body.author }).then((result) => {
							if (result.status === 200)
							{
								setAuthorData(result.data);
							}
							else
							{
								notificationContext.addNotificationError(result.data.error);
							}
						});
				}
				else
				{
					notificationContext.addNotificationError(result.data.error);
					navigate("/*", { replace: true });
				}
			});
	}

	useEffect(() => {
			document.body.style.backgroundColor = "#FFFFFF";

			updateAdData();
		}, []);

	useEffect(() => {
			if (adData != null)
			{
				formatAdDateAndTime();
			}
		}, [adData])

	useEffect(() => {
			if (authorData != null)
			{
				formatAuthorDateAndTime();
			}
		}, [authorData])

	useEffect(() => {
			if (isEditingDialogWndVisible === true)
			{
				adTitleInputRef.current.value = adData.title;
				adDescriptionInputRef.current.value = adData.description;
				adPriceInputRef.current.value = adData.price;
			}
		}, [isEditingDialogWndVisible]);


	return (
		<React.Fragment>
			<Header/>
			<Centered>
				<ReturnBar/>
				<SectionDefault>
					<AdTab>
						{
							(adData == null) ?
								<Skeleton variant="rectangular" width={ "300px" } height={ "300px" }/> :
								(
									<AdPhotoBlock>
										<AdPhoto style={ { height: "400px" } }/>
										<PhotoPreviewList>
											<PhotoPreviewStatic/>
											<PhotoPreviewStatic/>
											<PhotoPreviewStatic/>
											<PhotoPreviewStatic/>
											<PhotoPreviewStatic/>
										</PhotoPreviewList>
									</AdPhotoBlock>)
						}

						{
							(adData == null) ?
								<Skeleton variant="rectangular" width={ "300px" } height={ "300px" }/> :
								(
									<InfoBlock>
										<AdName>{ adData.title }</AdName>
										<AdAddInfoRegularText style={ { marginTop: "10px" }}>{ adCreationDateAndTime }</AdAddInfoRegularText>
										{
											(authorData == null) ?
												<Skeleton variant="rectangular" width={ "100px" } height={ "30px" }/> :
												<AdAddInfoRegularText style={ { marginTop: "4px" }}>{ authorData.town }</AdAddInfoRegularText>
										}

										<AdClickableText style={ { marginTop: "4px" }} onClick={ onShowReviewDialogWindowClick }>{ adData.comments.length } отзыва</AdClickableText>
										<AdPriceText style={ { marginTop: "34px" } }>{ String(adData.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ") } ₽</AdPriceText>

										{
											(authorData == null) ?
												<Skeleton variant="rectangular" width={ "200px" } height={ "75px" }/> :
												(((authContext.userData != null) && (authContext.userData.id === authorData._id)) ?
													(
														<ControlButtonGroupDiv>
															<ButtonDefaultColoured onClick={ onShowEditingDialogWindowClick } style={ { marginTop: "20px" } }>Редактировать</ButtonDefaultColoured>
															<ButtonDefaultColoured onClick={ onDeleteAdClick } style={ { marginTop: "20px" } }>Снять с публикации</ButtonDefaultColoured>
														</ControlButtonGroupDiv>
														):
													<ButtonDefaultColoured onClick={ onShowPhoneWindowClick } style={ { marginTop: "20px" } }>Показать телефон<br/>
														{ String(authorData.phoneNumber).replace(/(?<=\S{5})\S/g, "X") }</ButtonDefaultColoured>)
										}
										{
											(authorData == null) ?
												<Skeleton variant="rectangular" width={ "100px" } height={ "30px" }/> :
												(
													<AuthorBlock>
														<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
														<AuthorInfoBlock>
															<Link to={ "/profile/" + adData.author } style={ { textDecoration: 'none' } }>
																<AuthorInfoNameClickableText>{ authorData.name }{ (authorData.surname != "") && (" " + authorData.surname)}</AuthorInfoNameClickableText>
															</Link>
															<AdAddInfoRegularText>{ authorAccountCreationDateAndTime }</AdAddInfoRegularText>
														</AuthorInfoBlock>
													</AuthorBlock>)
										}

										{
											(isWndWithPhoneVisible == true) &&
												(
													<ForegroundBase>
														<DialogWindowBase>
															<DialogWindowHeader title="Телефон продавца" closeFunc={ onClosePhoneDialogWindowClick }/>
															<DialogWindowSpecialText>{ authorData.phoneNumber }</DialogWindowSpecialText>
														</DialogWindowBase>
													</ForegroundBase>)
										}
									</InfoBlock>)
						}
					</AdTab>
				</SectionDefault>
				<SectionDefault>
					{
						(adData == null) ?
							<Skeleton variant="rectangular" width={ "100%" } height={ "60px" }/> :
							(
								<React.Fragment>
									<SectionName>Описание товара</SectionName>
									<RegularText style={ { width: "70%" } }>{ adData.description }</RegularText>
								</React.Fragment>)
					}
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
									<TextBoxDefault placeholder="Введите комментарий" onClick={ onCommentInputInput } style={ { marginTop: "14px", width: "500px", height: "100px" } }
										isErrorMarked={ isCommentInputErrorMarked } ref={ commentInputRef }/>
									<ButtonDefaultColoured onClick={ onPublichReviewClick } style={ { marginTop: "14px" } }>Опубликовать</ButtonDefaultColoured>
									{
										adData.comments.map((review) => {
												return (<Review id={ review } onDeleteReview={ updateAdData }/>);
											})
									}
								</ReviewBlock>
							</DialogWindowBase>
						</ForegroundBase>)
			}

			{
				(isEditingDialogWndVisible == true) &&
					(
						<ForegroundBase>
							<DialogWindowBase>
								<DialogWindowHeader title="Новое объявление" closeFunc={ onCloseEditingDialogWindowClick }/>
								<DialogWindowRegularText style={ { marginTop: "10px" } }>Название</DialogWindowRegularText>
								<InputDefault placeholder="Введите название" style={ { marginTop: "4px", width: "500px" } } ref={ adTitleInputRef }
									onInput={ onAdTitleInputInput } isErrorMarked={ isAdTitleInputErrorMarked }/>
								<DialogWindowRegularText style={ { marginTop: "20px" } }>Описание</DialogWindowRegularText>
								<TextBoxDefault placeholder="Введите описание" style={ { marginTop: "4px", width: "500px", height: "200px" } } ref={ adDescriptionInputRef }/>
								
								<PhotoBlockHeaderSpan style={ { marginTop: "20px" } }>
									<DialogWindowRegularText>Фотографии товара</DialogWindowRegularText>
									<SpanSecondaryText>не более 5 фотографий</SpanSecondaryText>
								</PhotoBlockHeaderSpan>
								<PhotoPreviewList>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
									<PhotoPreviewDynamic/>
								</PhotoPreviewList>
								
								<DialogWindowRegularText style={ { marginTop: "30px" } }>Цена</DialogWindowRegularText>
								<PriceInputSpan style={ { marginTop: "4px", width: "200px" } } isErrorMarked={ isAdPriceInputErrorMarked }>
									<PriceInputCustomInput ref={ adPriceInputRef } onKeyDown={ onAdPriceInputKeyDown } onInput={ onAdPriceInputInput }/>
									<PriceInputSymbol>₽</PriceInputSymbol>
								</PriceInputSpan>
								<ButtonDefaultColoured onClick={ onSaveAdChangesClick } style={ { marginTop: "30px" } }>Опубликовать</ButtonDefaultColoured>
							</DialogWindowBase>
						</ForegroundBase>)
			}
		</React.Fragment>
	)
}
