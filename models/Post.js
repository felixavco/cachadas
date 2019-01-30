const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref:'users', required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	contactEmail : { type: String, required: true },
	contactPhone: { type: String, required: true },
	propertyType: { type: String },
	transaction: { type: String },
	images: [],
	make: { type: String },
	transmision: { type: String },
	year: { type: String },
	gas: { type: String },
	model: { type: String },
	type: { type: String },
	rooms: { type: String },
	bathrooms: { type: String },
  posted_date: { type: Date, default: new Date() }
});

module.exports = Post = mongoose.model('posts', PostSchema);
