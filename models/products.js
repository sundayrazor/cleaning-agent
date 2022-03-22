var mongoose = require("mongoose");
const { Double } = require("mongodb");

var productSchema = new mongoose.Schema({
    name: String,
    price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}, 
		username: String
	}
});

module.exports = mongoose.model("Product", productSchema);