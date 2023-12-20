import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { Centered, SectionDefault, SectionNameSmall } from "../styles/PageStyles";
import { Header } from "../components/Header";
import ReturnBar from "../components/ReturnBar";
import { useAuthContext } from "../authContext";
import { AdvertisementList } from "../components/Advertisement";
import ProfileInfoBlockPrivate from "../components/ProfileInfoBlockPrivate";
import ProfileInfoBlockPublic from "../components/ProfileInfoBlockPublic";
import { getAdsOfUser, getUserData } from "../api";
import { useNotificationContext } from "../notificationContext";


const WelcomeText = styled.h2`
	margin-bottom: 10px;

	color: #000000;
	font-weight: 500;
	font-size: 40px;
	line-height: 88px;
	text-align: left;
`;


export default function ProfilePage() {
	const authContext = useAuthContext();
	const notificationContext = useNotificationContext();
	const pageParams = useParams();
	const navigate = useNavigate();

	const [ isOwnProfile, setIfOwnProfile ] = useState(null);
	const [adList, setAdList] = useState([]);


	const updateAdList = (userId) => {
		getAdsOfUser({ userId: userId }).then((result) => {
				const adListProcessed = [];

				result.data.forEach((srcAdData) => {
						const adData = {
							id: srcAdData._id,
							authorId: srcAdData.author,
							title: srcAdData.title,
							description: srcAdData.description,
							created: srcAdData.created,
							price: srcAdData.price,
							images: srcAdData.images,
						}

						adListProcessed.push(adData);
					});

				setAdList(adListProcessed);
			});
	}

	const setProfileState = () => {
		if (pageParams.id !== undefined)
		{
			if (authContext.userData != null)
			{
				if (authContext.userData.id === pageParams.id)
				{
					setIfOwnProfile(true);
					updateAdList(authContext.userData.id);
		
					return;
				}
			}
		
			getUserData({ id: pageParams.id }).then((result) => {
					if (result.status === 200)
					{
						setIfOwnProfile(false);
						updateAdList(pageParams.id);
					}
					else
					{
						notificationContext.addNotificationError(result.data.error);
						navigate("/*", { replace: true });
					}
				});
		}
		else
		{
			if (authContext.userData == null)
			{
				navigate("/login", { replace: true });
			}
			else
			{
				setIfOwnProfile(true);
				updateAdList(authContext.userData.id);
			}
		}
	}


	useEffect(() => {
			document.body.style.backgroundColor = "#FFFFFF";

			setProfileState();
		}, []);

	useEffect(() => {
			setProfileState();
		}, [pageParams]);


	return (
		<React.Fragment>
			<Header/>
			<Centered>
				<ReturnBar/>
				<SectionDefault>
					{
						(isOwnProfile == null) ?
							<Skeleton variant="rectangular" width={ "100%" } height={ "30px" } /> :
							(
								(isOwnProfile === true) ?
									<WelcomeText>Здравствуйте, { authContext.userData.name }</WelcomeText> :
									<WelcomeText>Профиль продавца</WelcomeText>)
					}
					
					{
						(isOwnProfile == null) ?
							<Skeleton variant="rectangular" width={ "100%" } height={ "30px" } /> :
							(
								(isOwnProfile === true) ?
									<ProfileInfoBlockPrivate/> :
									<ProfileInfoBlockPublic userId={ pageParams.id }/>)
					}
				</SectionDefault>
				<SectionDefault>
					{
						(isOwnProfile == null) ?
							<Skeleton variant="rectangular" width={ "100%" } height={ "30px" } /> :
							(
								(isOwnProfile === true) ?
									<SectionNameSmall>Мои товары</SectionNameSmall> :
									<SectionNameSmall>Товары продавца</SectionNameSmall>)
					}
					
					<AdvertisementList adList={ adList }/>
				</SectionDefault>
			</Centered>
		</React.Fragment>);
}