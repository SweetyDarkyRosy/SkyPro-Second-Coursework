const Joi = require("joi");
const User = require("../model/user");


const addUserBody = Joi.object({
		eMail: Joi.string().required(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		phoneNumber: Joi.string().required()
	}).options({ allowUnknown: true });

const logInBody = Joi.object({
		eMail: Joi.string().required(),
		password: Joi.string().required()
	}).options({ allowUnknown: false });

const eMailRegExpr = /\S+@\S+\.\S+/g;


const addUser = async (request, response) => {
	try {
		const { error } = addUserBody.validate(request.body);
		if (error)
		{
			return response.status(400).json({ error: 'Невалидное тело запроса' });
		}

		const newUserEMail = request.body.eMail;
		if (String(newUserEMail).match(eMailRegExpr) == null)
		{
			return response.status(401).json({ error: 'Неверный формат E-Mail' });
		}

		const newUserPassword = request.body.password;
		if (newUserPassword.length < 3)
		{
			return response.status(401).json({ error: 'Пароль слишком короткий (должно быть не меньше 3 символов)' });
		}

		const newUserName = request.body.name;
		if (newUserName.length < 1)
		{
			return response.status(401).json({ error: 'Имя слишком короткое (должно быть не меньше 1 символа)' });
		}

		const newUserPhoneNumber = request.body.phoneNumber;
		if (newUserPhoneNumber.length < 8)
		{
			return response.status(401).json({ error: 'Номер телефона слишком короткий (должно быть не меньше 8 символов)' });
		}

		let newUserSurname = "";
		if (request.body.surname.length !== 0)
		{
			newUserSurname = request.body.surname;
			if (newUserSurname.length < 1)
			{
				return response.status(401).json({ error: 'Фамилия слишком короткая (должно быть не меньше 1 символа)' });
			}
		}

		let newUserTown = "";
		if (request.body.town.length !== 0)
		{
			newUserTown = request.body.town;
			if (newUserTown.length < 2)
			{
				return response.status(401).json({ error: 'Наименование города слишком короткое (должно быть не меньше 2 символов)' });
			}
		}

		const user = new User({ eMail: newUserEMail, password: newUserPassword, name: newUserName, phoneNumber: newUserPhoneNumber,
			surname: newUserSurname, town: newUserTown });

		await user.save().then(() => {
				response.status(201).json({ result: "Новый аккаунт был создан" });
			});
	}
	catch(error)
	{
		if (error.code == 11000)
		{
			response.status(401).json({ error: "Указанный E-Mail уже используется" });
		}
		else
		{
			response.status(500).json({ error: error.message });
		}
	}
}

const logIn = async (request, response) => {
	try
	{
		const { error } = logInBody.validate(request.body);
		if (error)
		{
			return response.status(400).json({ error: 'Невалидное тело запроса' });
		}

		const foundUser = await User.findOne({ eMail: request.body.eMail, password: request.body.password });
		if (!foundUser)
		{
			response.status(402).json({ status: 'Пользователь не найден' });
		}
		else
		{
			response.status(201).json({ status: 'Пользователь найден', body: {
					id: foundUser._id.toString(),
					name: foundUser.name,
					surname: foundUser.surname,
					phoneNumber: foundUser.phoneNumber,
					town: foundUser.town
				}});
		}
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const updateUserInfo = async (request, response) => {
	try
	{
		const { id } = request.params;

		const foundUser = await User.findById(id);
		if (!foundUser)
		{
			return response.status(402).json({ status: 'Пользователь с данным ID не был найден' });
		}

		if (request.body.name.length < 1)
		{
			return response.status(401).json({ error: 'Имя слишком короткое (должно быть не меньше 1 символа)' });
		}

		foundUser.name = request.body.name;

		if (request.body.surname.length !== 0)
		{
			if (request.body.surname.length < 1)
			{
				return response.status(401).json({ error: 'Фамилия слишком короткая (должно быть не меньше 1 символа)' });
			}

			foundUser.surname = request.body.surname;
		}
		else
		{
			foundUser.surname = '';
		}

		if (request.body.phoneNumber.length < 8)
		{
			return response.status(401).json({ error: 'Номер телефона слишком короткий (должно быть не меньше 8 символов)' });
		}

		foundUser.phoneNumber = request.body.phoneNumber;

		if (request.body.town.length !== 0)
		{
			if (request.body.town.length < 2)
			{
				return response.status(401).json({ error: 'Наименование города слишком короткое (должно быть не меньше 2 символов)' });
			}

			foundUser.town = request.body.town;
		}
		else
		{
			foundUser.town = '';
		}
		
		await foundUser.save().then(() => {
				response.status(201).json({ status: 'Пользователь найден', body: {
						id: foundUser._id.toString(),
						name: foundUser.name,
						surname: foundUser.surname,
						phoneNumber: foundUser.phoneNumber,
						town: foundUser.town
					}});
			});
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}


module.exports = {
	logIn,
	addUser,
	updateUserInfo
};
