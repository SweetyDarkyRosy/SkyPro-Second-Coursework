const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const cors = require('./middlewares/cors');
const userRouter = require('./routes/user');
const User = require('./model/user');
const adRouter = require('./routes/advertisement');
const Advertisement = require('./model/advertisement');
const commentRouter = require('./routes/comment');
const imagesRouter = require('./routes/image');


const app = express();

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.use(cors);

app.get('/', (request, response) => {
	response.status(200);
	response.send('Database is online!');
})

app.use(userRouter);
app.use(adRouter);
app.use(commentRouter);
app.use(imagesRouter);


try {
	mongoose.connect('mongodb://127.0.0.1:27017/adDatabase').then(() => {
			User.init();
			Advertisement.init();

			console.log('Успешное подключение к базе данных');
		});
} catch (error) {
	handleError(error);
}

app.listen(3005, () => {
	console.log("Server is working at " + "http://127.0.0.1" + ":" + 3005);
});
