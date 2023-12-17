const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const userRouter = require('./routes/user');
const User = require('./model/user');


const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	response.status(200);
	response.send('Database is online!');
})

app.use(userRouter);


try {
	mongoose.connect('mongodb://127.0.0.1:27017/adDatabase').then(() => {
			User.init();

			console.log('Успешное подключение к базе данных');
		});
} catch (error) {
	handleError(error);
}

app.listen(3005, () => {
	console.log("Server is working at " + "http://127.0.0.1" + ":" + 3005);
});
