// var express = require("express");
// var router = express.Router({mergeParams: true});
// var middleware   = require("../middleware");
// var	Comment  = require("../models/comments");
// var Shop   = require("../models/shops");

// router.post("/", middleware.isLogedIn, function(req, res){
// 	var text = req.body.comment.text;
// 	var author = req.body.comment.author;
// 	Shop.findById(req.params.id, function(err, shop){
// 		if(err || !shop){
// 			req.flash("error", "Shop not fount");
// 			console.log(err);
// 		}else{
// 			Comment.create({text: text, author: author}, function(err, comment){
// 				if(err){
// 					req.flash("error", "Something went wrong");
// 					console.log("Could not add comment");
// 				}else{
// 					comment.author.id = req.user._id;
// 					comment.author.username = req.user.username;
// 					comment.save();
// 					shop.comments.push(comment);
// 					shop.save();
// 					req.flash("success", "Successfully added comment!");
// 					res.redirect("/shops/"+shop._id);
// 				}
// 			});
// 		}
// 	});
// });

// // ===============================================
// // Add comment
// // ===============================================
// router.get("/new", middleware.isLogedIn, function(req, res){
// 	Shop.findById(req.params.id, function(err, shop){
// 		if(err || !shop){
// 			req.flash("error", "Shop not fount");
// 			res.redirect("back");
// 		}else{
// 			res.render("comments/new", {shop: shop});
// 		}
// 	});
// });

// // ===============================================
// // Edit comment
// // ===============================================
// router.get("/:comment_id/edit", middleware.checkCommentOunership, function(req, res){
// 	Shop.findById(req.params.id, function(err, foundShop){
// 		if(err || !foundShop){
// 			req.flash("error", "Shop not fount");
// 			res.redirect("back");
// 		}else{
// 			Comment.findById(req.params.comment_id, function(err, foundComment){
// 				if(err || !foundComment){
// 					req.flash("error", "Comment not fount");
// 					res.redirect("back");
// 				}else{
// 					res.render("comments/edit", {shop_id: req.params.id, comment: foundComment});
// 				}
// 			});
// 		}
// 	});
// });

// router.put("/:comment_id", middleware.checkCommentOunership, function(req, res){
// 	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
// 		if(err || !updatedComment){
// 			req.flash("error", "Comment not fount");
// 			res.redirect("back");
// 		}else{
// 			res.redirect("/shops/"+req.params.id);
// 		}
// 	});
// });

// // ===============================================
// // Delete comment
// // ===============================================
// router.delete("/:comment_id", middleware.checkCommentOunership, function(req, res){
// 	Comment.findByIdAndDelete(req.params.comment_id, function(err, deletedComment){
// 		if(err || !deletedComment){
// 			req.flash("error", "Comment not fount");
// 			res.redirect("back");
// 		}else{
// 			req.flash("success", "Comment deleted");
// 			res.redirect("/shops/"+req.params.id);
// 		}
// 	});
// });	

// module.exports = router;