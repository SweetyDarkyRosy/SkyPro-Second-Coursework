const userDataAPIAddr = "http://127.0.0.1:3005/users/";
const adDataAPIAddr = "http://127.0.0.1:3005/ads/";
const commentDataAPIAddr = "http://127.0.0.1:3005/comments/";


export async function registerNewUser({ eMail, password, name, surname, phoneNumber, town }) {
	const response = await fetch(userDataAPIAddr + "signup",
		{
			method: "POST",
			body: JSON.stringify(
				{
					eMail: eMail,
					password: password,
					name: name,
					phoneNumber: phoneNumber,
					surname: surname,
					town: town
				}),
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function logIn({ eMail, password }) {
	const response = await fetch(userDataAPIAddr + "login",
		{
			method: "POST",
			body: JSON.stringify(
				{
					eMail: eMail,
					password: password
				}),
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function getUserData({ id }) {
	const response = await fetch(userDataAPIAddr + id,
		{
			method: "GET",
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function updateUserData({ id, name, surname, phoneNumber, town }) {
	const response = await fetch(userDataAPIAddr + id,
		{
			method: "PATCH",
			body: JSON.stringify(
				{
					name: name,
					surname: surname,
					phoneNumber: phoneNumber,
					town: town
				}),
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function addNewAd({ userId, title, description, price, images }) {
	const formData = new FormData();
	formData.append("userId", userId);
	formData.append("title", title);
	formData.append("description", description);
	formData.append("price", price);

	for (let i = 0; i < images.length; i++)
	{
		formData.append('images', images[i]);
	}

	const response = await fetch(adDataAPIAddr,
		{
			method: "POST",
			body: formData
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function updateAd({ id, title, description, price, images, imagePosChangedArr }) {
	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	formData.append("price", price);

	for (let i = 0; i < imagePosChangedArr.length; i++)
	{
		formData.append('imagePosChangedArr[]', imagePosChangedArr[i]);
	}

	for (let i = 0; i < images.length; i++)
	{
		formData.append('images', images[i]);
	}

	const response = await fetch(adDataAPIAddr + id,
		{
			method: "PATCH",
			body: formData
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function deleteAd({ id }) {
	const response = await fetch(adDataAPIAddr + id,
		{
			method: "DELETE",
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function getAds() {
	const response = await fetch(adDataAPIAddr,
		{
			method: "GET",
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function getAd({ id }) {
	const response = await fetch(adDataAPIAddr + id,
		{
			method: "GET",
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function getAdsOfUser({ userId }) {
	const response = await fetch(userDataAPIAddr + String(userId) + "/ads",
		{
			method: "GET",
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function addComment({ userId, adId, comment }) {
	const response = await fetch(adDataAPIAddr + String(adId) + "/comments",
		{
			method: "POST",
			body: JSON.stringify(
				{
					userId: userId,
					comment: comment
				}),
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function getComment({ id }) {
	const response = await fetch(commentDataAPIAddr + String(id),
		{
			method: "GET",
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function updateComment({ id, comment }) {
	const response = await fetch(commentDataAPIAddr + String(id),
		{
			method: "PATCH",
			body: JSON.stringify(
				{
					comment: comment
				}),
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function deleteComment({ commentId, adId }) {
	const response = await fetch(commentDataAPIAddr + String(commentId),
		{
			method: "DELETE",
			body: JSON.stringify(
				{
					adId: adId
				}),
			headers: { "content-type": "application/json" }
		});

	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}
