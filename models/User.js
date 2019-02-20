const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { default_avatar_URL } = require('../config/keys')

//Create Schema
const UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	public_email: { type: String },
	phone: { type: String },
	role: { type: String, default: 'user', required: true},
	resetToken: { type: String },
	expResToken: { type: Date },
	isVerified: {type: Boolean, default: false, required: true},
	verificationToken: { type: String, required: true },
	expVerificationToken: { type: Date, required: true },
	avatar: {
		type: String,
		default: 'avatars/default.jpg'
	},
	creation_date: { type: Date, default: new Date() }, 
});

module.exports = User = mongoose.model('users', UserSchema);
