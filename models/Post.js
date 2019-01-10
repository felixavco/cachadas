const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref:'users' },
	title: { type: String, required: true },
	Description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
  images: { tyep: Array, default: ['http://r-es.org/wp-content/themes/oria/images/placeholder.png'] },
  posted_date: { type: Date, default: new Date() }
});

module.exports = Post = mongoose.model('posts', PostSchema);
