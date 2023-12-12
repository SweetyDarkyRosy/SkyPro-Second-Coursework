import { Link } from "react-router-dom";
import styled from "styled-components";


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
	justify-content: center;
	align-items: flex-start;
	gap: 10px
`;

const AdvertisementPreviewImg = styled.img`
	max-width: fit-content;
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


function Advertisement({ adId }) {
	return (
		<AdvertisementBase>
			<AdvertisementPreviewImg src="/img.img"/>
			<AdvertisementName to={ '/ad/' + adId }>Наименование данного товара</AdvertisementName>
			<AdvertisementPriceText>2 200 ₽</AdvertisementPriceText>
			<AdvertisementSecondaryInfoBlock>
				<AdvertisementSecondaryInfoText>Санкт-Петербург</AdvertisementSecondaryInfoText>
				<AdvertisementSecondaryInfoText>Сегодня в 10:45</AdvertisementSecondaryInfoText>
			</AdvertisementSecondaryInfoBlock>
		</AdvertisementBase>);
}

export function AdvertisementList() {
	return (
		<AdvertisementListBase>
			<Advertisement adId={ 1 }/>
			<Advertisement adId={ 1 }/>
			<Advertisement adId={ 1 }/>
			<Advertisement adId={ 1 }/>
			<Advertisement adId={ 1 }/>
			<Advertisement adId={ 1 }/>
			<Advertisement adId={ 1 }/>
		</AdvertisementListBase>);
}
