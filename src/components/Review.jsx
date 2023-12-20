import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { DialogWindowRegularText } from "../styles/ForegroundStyles";
import { deleteComment, getComment, getUserData, updateComment } from "../api";
import { useNotificationContext } from "../notificationContext";
import { useAuthContext } from "../authContext";
import { ButtonDefaultColoured, ButtonDefaultTransparent } from "./Button";
import { TextBoxDefault } from "./Input";
import { useParams } from "react-router-dom";


const ReviewBase = styled.div`
	margin: 30px 2px 0 2px;
	padding: 4px;

	width: 95%;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 12px;

	outline: ${ props => (props.isEditingOn ? '1px solid #009EE4': 'none') };
	border-radius: 6px;
`;

const AuthorAvatarImg = styled.img`
	width: 40px;
	height: 40px;
`;

const CommentBlock = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

export const CommentLabel = styled.p`
	color: #000000;
	font-weight: 600;
	font-size: 16px;
	line-height: 32px;
	text-align: left;
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

const ClickableText = styled.p`
	margin-top: 10px;

	font-family: Noto Sans;

	color: #009EE4;
	font-weight: 400;
	font-size: 16px;
	line-height: 20.8px;
	text-align: left;

	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const EditCommentDiv = styled.div`
	margin-top: 10px;

	width: 90%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 6px;
`;

const EditCommentButtonGroup = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;

const EditCommentButtonDefault = styled(ButtonDefaultColoured)`
	padding: 4px 12px;

	min-height: 30px;
`;

const EditCommentButtonTransparent = styled(ButtonDefaultTransparent)`
	padding: 4px 12px;

	min-height: 30px;
`;


export function Review({ id, onDeleteReview }) {
	const pageParams = useParams();
	const authContext = useAuthContext();
	const notificationContext = useNotificationContext();

	const commentInputRef = useRef();

	const [ reviewData, setReviewData] = useState(null);

	const [ reviewAuthorFullName, setReviewAuthorFullName ] = useState("ПОЛЬЗОВАТЕЛЬ");
	const [ reviewCreationDateAndTime, setReviewCreationDateAndTime ] = useState("");

	const [ isCommentEditingModeOn, setCommentEditingMode ] = useState(false);

	const [ isCommentInputErrorMarked, setIsCommentInputErrorMarkedState ] = useState(false);


	const onEditCommentClick = () => {
		setCommentEditingMode(true);
	}

	const onCancelCommentEditingClick = () => {
		setCommentEditingMode(false);

		setIsCommentInputErrorMarkedState(false);
		commentInputRef.current.value = "";
	}

	const onCommentInputInput = () => {
		setIsCommentInputErrorMarkedState(false);
	}

	const onSaveReviewClick = () => {
		if (commentInputRef.current.value.length === 0)
		{
			setIsCommentInputErrorMarkedState(true);
			notificationContext.addNotificationError("Комментарий не был введён");
			return;
		}

		updateComment({ id: id, comment: commentInputRef.current.value }).then((result) => {
				if (result.status === 201)
				{
					notificationContext.addNotification("Отзыв был обновлён");

					setCommentEditingMode(false);

					setIsCommentInputErrorMarkedState(false);
					commentInputRef.current.value = "";

					updateReviewData();
				}
				else
				{
					notificationContext.addNotificationError(result.data.error);
				}
			})
	}

	const onDeleteReviewClick = () => {
		deleteComment({ commentId: id , adId: String(pageParams.id) }).then((result) => {
				if (result.status === 202)
				{
					notificationContext.addNotification("Отзыв был удалён");

					setCommentEditingMode(false);

					onDeleteReview();
				}
				else
				{
					notificationContext.addNotificationError(result.data.error);
				}
			})
	}

	const formatAdDateAndTime = () => {
		const createdTimeAndDate = new Date(reviewData.created);
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

		setReviewCreationDateAndTime(dateAndTimeText);
	}

	const updateReviewData = () => {
		getComment({ id: id }).then((result) => {
				if (result.status === 200)
				{
					setReviewData(result.data.body);
					
					getUserData({ id: result.data.body.author }).then((result) => {
							if (result.status === 200)
							{
								let authorFullName = result.data.name;
								if (result.data.surname.length !== 0)
								{
									authorFullName += " ";
									authorFullName += result.data.surname;
								}

								setReviewAuthorFullName(authorFullName);
							}
						})
				}
				else
				{
					notificationContext.addNotificationError("Не удалось получить данные о комментарии");
				}
			});
	}

	useEffect(() => {
			updateReviewData();
		}, []);

	useEffect(() => {
			if (reviewData != null)
			{
				formatAdDateAndTime();
			}
		}, [reviewData]);

	useEffect(() => {
			if (isCommentEditingModeOn === true)
			{
				commentInputRef.current.value = reviewData.text;
			}
		}, [isCommentEditingModeOn])

	return (
		<ReviewBase isEditingOn={ isCommentEditingModeOn }>
			<AuthorAvatarImg src="/img/avatar-placeholder.svg"/>
			<CommentBlock>
				{
					(reviewData == null) ?
						(
							<React.Fragment>
								<Skeleton variant="rectangular" width={ "150px" } height={ "30px" }/>
								<Skeleton variant="rectangular" width={ "300px" } height={ "90px" }/>
							</React.Fragment>) :
						(
							<React.Fragment>
								<ReviewHeaderSpan>
									<DialogWindowRegularText>{ reviewAuthorFullName }</DialogWindowRegularText>
									<SpanSecondaryText>{ reviewCreationDateAndTime }</SpanSecondaryText>
								</ReviewHeaderSpan>
								<CommentLabel style={ { marginTop: "12px" } }>Комментарий</CommentLabel>
								<DialogWindowRegularText>{ reviewData.text }</DialogWindowRegularText>
								{
									((authContext.userData != null) && (authContext.userData.id === reviewData.author)) &&
										(
											(isCommentEditingModeOn === false) ?
											<ClickableText onClick={ onEditCommentClick }>Изменить</ClickableText> :
											<EditCommentDiv>
												<TextBoxDefault placeholder="Введите комментарий" onClick={ onCommentInputInput } style={ { marginTop: "14px", width: "100%", height: "100px" } }
													isErrorMarked={ isCommentInputErrorMarked } ref={ commentInputRef }/>
												<EditCommentButtonGroup>
													<EditCommentButtonDefault onClick={ onSaveReviewClick }>Сохранить</EditCommentButtonDefault>
													<EditCommentButtonDefault onClick={ onDeleteReviewClick }>Удалить</EditCommentButtonDefault>
													<EditCommentButtonTransparent onClick={ onCancelCommentEditingClick }>Отменить</EditCommentButtonTransparent>
												</EditCommentButtonGroup>
											</EditCommentDiv>)
								}
							</React.Fragment>
						)
				}
			</CommentBlock>
		</ReviewBase>);
}