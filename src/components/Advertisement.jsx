import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUserData } from "../api";
import { useNotificationContext } from "../notificationContext";


const imageDataAPIAddr = "http://127.0.0.1:3005/images/";


const AdvertisementListBase = styled.div`
	margin-top: 10px;

	width: 100%;

	box-sizing: border-box;

	display: inline-grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 26px;
	column-gap: 40px;
`;

const AdvertisementBase = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 10px
`;

const AdvertisementPreviewEmptyBlock = styled.div`
	width: 270px;
	height: 270px;

	background-color: #F0F0F0;
`;

const AdvertisementPreviewImg = styled.img`
	width: 270px;
	height: 270px;
`;

const AdvertisementName = styled(Link)`
	width: 100%;

	color: #009EE4;
	font-weight: 500;
	font-size: 22px;
	line-height: 26.4px;
	text-align: left;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}

	&:active {
		text-decoration: none;
	}
`;

const AdvertisementPriceText = styled.p`
	color: #000000;
	font-weight: 500;
	font-size: 22px;
	line-height: 26.4px;
	text-align: left;
`;

const AdvertisementSecondaryInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 4px;
`;

const AdvertisementSecondaryInfoText = styled.p`
	color: #5F5F5F;
	font-weight: 400;
	font-size: 16px;
	line-height: 20.8px;
	text-align: left;
`;


function Advertisement({ adData }) {
	const notificationContext = useNotificationContext();

	const [ town, setTown ] = useState("");
	const [ creationDateAndTime, setCreationDateAndTime ] = useState("");


	const getAndSetTownInfo = () => {
		getUserData({ id: adData.authorId }).then((result) => {
				if (result.status === 200)
				{
					setTown(result.data.town);
				}
				else
				{
					notificationContext.addNotificationError(result.data.error);
				}
			});
	}

	const formatDateAndTime = () => {
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

		setCreationDateAndTime(dateAndTimeText);
	}

	useEffect(() => {
			console.log(adData);

			getAndSetTownInfo();
			formatDateAndTime();
		}, [])


	return (
		<AdvertisementBase>
			{
				(adData.images.length === 0) ?
					<AdvertisementPreviewEmptyBlock/> :
					<AdvertisementPreviewImg src={ imageDataAPIAddr + adData.images[0] }/>
			}
			<AdvertisementName to={ '/ad/' + adData.id }>{ adData.title }</AdvertisementName>
			<AdvertisementPriceText>{ String(adData.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ") } ₽</AdvertisementPriceText>
			<AdvertisementSecondaryInfoBlock>
				<AdvertisementSecondaryInfoText>{ town }</AdvertisementSecondaryInfoText>
				<AdvertisementSecondaryInfoText>{ creationDateAndTime }</AdvertisementSecondaryInfoText>
			</AdvertisementSecondaryInfoBlock>
		</AdvertisementBase>);
}

export function AdvertisementList({ adList }) {
	return (
		<AdvertisementListBase>
			{
				adList.map((ad) => {
						return (<Advertisement adData={ ad }/>);
					})
			}
		</AdvertisementListBase>);
}
