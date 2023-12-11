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
	const pageParams = useParams();
	const navigate = useNavigate();

	const [ isOwnProfile, setIfOwnProfile ] = useState(null);


	const setProfileState = () => {
		if (pageParams.id !== undefined)
		{
			if (authContext.userData != null)
			{
				if (authContext.userData.userKey === Number(pageParams.id))
				{
					setIfOwnProfile(true);
					return;
				}
			}

			setIfOwnProfile(false);
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
			}
		}
	}


	useEffect(() => {
			document.body.style.backgroundColor = "#FFFFFF";

			setProfileState();
		});


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
									<ProfileInfoBlockPublic/>)
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
					
					<AdvertisementList/>
				</SectionDefault>
			</Centered>
		</React.Fragment>);
}