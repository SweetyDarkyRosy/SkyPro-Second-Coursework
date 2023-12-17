const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
	eMail: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	phoneNumber: {
		type: String,
		required: true
	},

	surname: {
		type: String
	},

	town: {
		type: String
	},

	/*
	ads: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Advertisement'
	 }]
	*/
});

const User = mongoose.model('User', UserSchema);


module.exports = User;
