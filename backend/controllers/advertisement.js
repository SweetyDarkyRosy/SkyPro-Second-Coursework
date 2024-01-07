const Joi = require("joi");
const path = require('path');
const fs = require('fs');

const Advertisement = require("../model/advertisement");
const User = require("../model/user");
const Comment = require("../model/comment");


const publishAdBody = Joi.object({
		userId: Joi.string().required(),
		title: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.string().required()
	}).options({ allowUnknown: false });

const updateAdBody = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.string().required(),
		imagePosChangedArr: Joi.array().optional()
	}).options({ allowUnknown: false });

const publishCommentBody = Joi.object({
		userId: Joi.string().required(),
		comment: Joi.string().required()
	}).options({ allowUnknown: false });


const publishAd = async (request, response) => {
	try {
		const { error } = publishAdBody.validate(request.body);
		if (error)
		{
			return response.status(400).json({ error: 'Невалидное тело запроса' });
		}

		const user = await User.findById(request.body.userId);
		if (!user)
		{
			return response.status(401).json({ error: "Пользователь не был найден" });
		}

		const creationDateAndTime = new Date();

		console.log(request.files);

		const imageList = [];
		for (let i = 0; i < request.files.length; i++)
		{
			const fileName = request.files[i]["filename"];
			imageList.push(fileName);
		}

		const ad = new Advertisement({ title: request.body.title, description: request.body.description,
			price: request.body.price, created: creationDateAndTime, comments: [], images: imageList, author: user });

		user.ads.push(ad);

		await ad.save();
		await user.save();
		
		response.status(201).json({ result: "Объявление было добавлено" });
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const updateAd = async (request, response) => {
	try {
		const { error } = updateAdBody.validate(request.body);
		if (error)
		{
			return response.status(400).json({ error: 'Невалидное тело запроса' });
		}

		const { id } = request.params;

		const foundAd = await Advertisement.findById(id);
		if (!foundAd)
		{
			return response.status(402).json({ error: 'Объявление не было найдено' });
		}

		if (request.body.imagePosChangedArr)
		{
			for (let i = 0; i < request.body.imagePosChangedArr.length; i++)
			{
				const fileName = request.files[i]["filename"];
				const pos = Number(request.body.imagePosChangedArr[0]);

				if (pos < foundAd.images.length)
				{
					const oldImagePath = path.join(__dirname, '../uploads', foundAd.images[pos]);
					fs.unlinkSync(oldImagePath);

					foundAd.images[pos] = fileName;
				}
				else
				{
					foundAd.images.push(fileName);
				}
			}
		}

		foundAd.title = request.body.title;
		foundAd.description = request.body.description;
		foundAd.price = request.body.price;

		await foundAd.save().then(() => {
				response.status(201).json({ status: 'Объявление было обновлено'});
			});
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const getAds = async (request, response) => {
	try {
		await Advertisement.find().then((result) => {
				response.status(200);
				response.json(result);
			});
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const getAd = async (request, response) => {
	try {
		const { id } = request.params;

		const foundAd = await Advertisement.findById(id);
		if (!foundAd)
		{
			response.status(402).json({ error: 'Объявление не было найдено' });
		}

		response.status(200).json({ status: 'Объявление найдено', body: foundAd });
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const deleteAd = async (request, response) => {
	try {
		const { id } = request.params;

		const foundAd = await Advertisement.findById(id);
		if (!foundAd)
		{
			return response.status(402).json({ error: 'Объявление не было найдено' });
		}

		for (let it = 0; it < foundAd.comments.length; it++)
		{
			const foundComment = await Comment.findById(foundAd.comments[it].toString());
			if (foundComment)
			{
				await Comment.findByIdAndDelete(foundAd.comments[it].toString());
			}
		}

		for (let it = 0; it < foundAd.images.length; it++)
		{
			const imagePath = path.join(__dirname, '../uploads', foundAd.images[it]);
			fs.unlinkSync(imagePath);
		}

		await Advertisement.findByIdAndDelete(id);

		response.status(202).json({ status: 'Объявление было удалено' });
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const publishComment = async (request, response) => {
	try {
		const { error } = publishCommentBody.validate(request.body);
		if (error)
		{
			return response.status(400).json({ error: 'Невалидное тело запроса' });
		}

		const { id } = request.params;

		const foundAd = await Advertisement.findById(id);
		if (!foundAd)
		{
			return response.status(402).json({ error: 'Объявление не было найдено' });
		}

		const foundUser = await User.findById(request.body.userId);
		if (!foundUser)
		{
			return response.status(401).json({ error: "Пользователь не был найден" });
		}

		const creationDateAndTime = new Date();

		const comment = new Comment({ text: request.body.comment, created: creationDateAndTime,
			author: foundUser });

		await comment.save();

		foundAd.comments.push(comment);

		await foundAd.save();

		response.status(201).json({ status: 'Комментарий был опубликован' });
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}


module.exports = {
	publishAd,
	updateAd,
	getAds,
	getAd,
	deleteAd,
	publishComment
};
