const mongoose = require('mongoose');


const AdSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	},

	price: {
		type: Number,
		required: true
	},

	created: {
		type: Date,
		required: true
	},

	images: [{
		type: Buffer,
		required: true
	}],

	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Advertisement = mongoose.model('Advertisement', AdSchema);


module.exports = Advertisement;