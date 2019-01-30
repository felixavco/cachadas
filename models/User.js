const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { default_avatar_URL } = require('../config/keys')

//Create Schema
const UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	gender: { type: String },
	GoogleId: { type: String}, 
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	public_email: { type: String },
	phone: { type: String },
	role: { type: String, default: 'user', required: true},
	resetToken: { type: String },
	expResToken: { type: Date },
	avatar: {
		type: String,
		default: 'avatars/default.jpg'
	},
	creation_date: { type: Date, default: new Date() }, 
	wish_list: [{
		post_item: { type: Schema.Types.ObjectId, ref: 'posts'}
	}]
});

module.exports = User = mongoose.model('users', UserSchema);