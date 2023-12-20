const Joi = require("joi");
const Comment = require("../model/comment");
const Advertisement = require("../model/advertisement");


const updateCommentBody = Joi.object({
		comment: Joi.string().required()
	}).options({ allowUnknown: false });

const deleteCommentBody = Joi.object({
		adId: Joi.string().required()
	}).options({ allowUnknown: false });


const getComment = async (request, response) => {
	try {
		const { id } = request.params;

		const foundComment = await Comment.findById(id);
		if (!foundComment)
		{
			return response.status(402).json({ error: 'Комментарий не был найден' });
		}

		response.status(200).json({ status: 'Комментарий найден', body: foundComment });
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const updateComment = async (request, response) => {
	try {
		const { error } = updateCommentBody.validate(request.body);
		if (error)
		{
			return response.status(400).json({ error: 'Невалидное тело запроса' });
		}

		const { id } = request.params;

		const foundComment = await Comment.findById(id);
		if (!foundComment)
		{
			return response.status(402).json({ error: 'Комментарий не был найден' });
		}

		foundComment.text = request.body.comment;

		await foundComment.save().then(() => {
				response.status(201).json({ status: 'Комментарий был обновлён' });
			});
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}

const deleteComment = async (request, response) => {
	try {
		const { error } = deleteCommentBody.validate(request.body);
		if (error)
		{
			return response.status(400).json({ error: 'Невалидное тело запроса' });
		}

		const foundAd = await Advertisement.findById(request.body.adId);
		if (!foundAd)
		{
			return response.status(402).json({ error: 'Объявление не было найдено' });
		}

		const { id } = request.params;

		const foundComment = await Comment.findById(id);
		if (!foundComment)
		{
			return response.status(402).json({ error: 'Комментарий не был найден' });
		}

		{
			const index = foundAd.comments.indexOf(id);
			if (index > -1)
			{
				foundAd.comments.splice(index, 1);
			}
			else
			{
				return response.status(402).json({ error: 'Не удалось разорвать связь между комментарием и объявлением' });
			}
		}

		await foundAd.save();

		await Comment.findByIdAndDelete(id).then(() => {
				response.status(202).json({ status: 'Комментарий был удалён' });
			})
	}
	catch(error)
	{
		response.status(500).json({ error: error.message });
	}
}


module.exports = {
	getComment,
	updateComment,
	deleteComment
};
