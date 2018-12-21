const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	gender: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	public_email: { type: String },
	phone: { type: String },
	role: { type: String, default: 'user' },
	avatar: {
		type: String,
		default: 'http://www.oda-alc.org/wp-content/uploads/jpg/generic-profile-avatar_352864.jpg'
	},
	creation_date: { type: Date, default: new Date() }
});

module.exports = User = mongoose.model('users', UserSchema);
