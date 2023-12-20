import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Notification } from "./components/Notification";


export const NotificationContext = createContext();
let updateNotificationArrayIntervalID = null;


export function useNotificationContext() {
	return useContext(NotificationContext);
}


const NotificationBasis = styled.div`
	padding: 10px 40px;

	width: 100vw;
	height: 100%;

	z-index: 200;
	position: fixed;
	top: 0px;
	left: 0px;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	gap: 4px;

	pointer-events: none;
`


export const NotificationProvider = (props) => {
	const [notificationArray, setNotificationArray] = useState([]);


	const removeOldestNotification = () => {
		setNotificationArray((arr) => { return arr.slice(1) });
	}

	const addNotification = (notification) => {
		const newNotification = new Notification({ text: notification, isError: false });
		setNotificationArray([...notificationArray, newNotification]);
	}

	const addNotificationError = (notification) => {
		const newNotification = new Notification({ text: notification, isError: true });
		setNotificationArray([...notificationArray, newNotification]);
	}

	useEffect(() => {
			if (notificationArray.length === 0)
			{
				clearInterval(updateNotificationArrayIntervalID);
				updateNotificationArrayIntervalID = null;
			}
			else
			{
				if (updateNotificationArrayIntervalID == null)
				{
					updateNotificationArrayIntervalID = setInterval(removeOldestNotification, 2000);
				}
			}
		}, [notificationArray])


	return (
		<NotificationContext.Provider value={ { addNotification, addNotificationError } }>
			{
				props.children
			}

			<NotificationBasis>
			{
				notificationArray.map((notification) => {
						return notification;
					})
			}
			</NotificationBasis>
		</NotificationContext.Provider>)
}