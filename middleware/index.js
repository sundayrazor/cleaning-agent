var	Comment  = require("../models/comments");
var	Product  = require("../models/products");
var multer = require('multer');
var fs = require('fs');
var middlewareObj = {};

middlewareObj.isLogedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash("error", "You need to be logged to do that");
		res.redirect("/login");
	}
}

// middlewareObj.checkShopOunership = function(req, res, next){
// 	if(req.isAuthenticated()){
// 		Shop.findById(req.params.id, function(err, foundShop){
// 			if(err || !foundShop){
// 				req.flash("error", "Shop not found");
// 				res.redirect("back");
// 			}else{
// 				if(foundShop.author.id.equals(req.user._id)){
// 					next();
// 				}else{
// 					req.flash("error", "You don't have permission to that");
// 					res.redirect("back");
// 				}
// 			}
// 		});
// 	}else{
// 		req.flash("error", "You need to be logged to do that");
// 		res.redirect("back");
// 	}
// }

middlewareObj.checkCommentOunership= function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permission to that");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "You need to be logged to do that");
		res.redirect("back");
	}
}

middlewareObj.checkProductOunership= function(req, res, next){
	if(req.isAuthenticated()){
		Product.findById(req.params.product_id, function(err, foundProduct){
			if(err || !foundProduct){
				req.flash("error", "Product not found");
				res.redirect("back");
			}else{
				if(foundProduct.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permission to that");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "You need to be logged to do that");
		res.redirect("back");
	}
}

middlewareObj.Storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/images");
	},
	filename: function(req, file, callback) {
		var filename = Date.now()+"_"+file.originalname;
		middlewareObj.imagename = filename;
		callback(null, filename);
	}
});

middlewareObj.upload = multer({
	storage: middlewareObj.Storage
});

middlewareObj.delete = function(filename){
	fs.unlink("./public/images/"+filename, function(err){
		if (err) {
			console.log("failed to delete "+filename+" image "+err);
		} else {
			console.log("successfully deleted "+filename+" image");                             
		}
	});
}

module.exports = middlewareObj;