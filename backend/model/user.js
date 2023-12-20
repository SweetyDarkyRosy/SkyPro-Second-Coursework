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

	surname: {
		type: String
	},


	phoneNumber: {
		type: String,
		required: true
	},

	town: {
		type: String
	},

	created: {
		type: Date,
		required: true
	},

	ads: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Advertisement'
	}]
});

const User = mongoose.model('User', UserSchema);


module.exports = User;
