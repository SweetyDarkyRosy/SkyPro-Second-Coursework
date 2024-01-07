const path = require('path');
const fs = require('fs');


const getImage = async (request, response) => {
	const { name } = request.params;

	const imagePath = path.join(__dirname, '../uploads', name);
	fs.access(imagePath, fs.constants.F_OK, (error) => {
			if (error)
			{
				return response.status(404).json({ error: "Файл не был найден" });
			}
			else
			{
				response.sendFile(imagePath);
			}
		});
}


module.exports = {
	getImage
};
