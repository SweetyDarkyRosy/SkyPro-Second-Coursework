const userDataAPIAddr = "http://127.0.0.1:3005/users/";


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

export async function LogIn({ eMail, password }) {
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

export async function UpdateUserData({ id, name, surname, phoneNumber, town }) {
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
