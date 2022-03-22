var express = require("express");
var router = express.Router({mergeParams: true});
var middleware   = require("../middleware");
var	Product  = require("../models/products");

// ===============================================
// Add Product
// ===============================================
router.get("/new", middleware.isLogedIn, function(req, res){
	res.render("./products/new");
});

router.post("/product", middleware.isLogedIn, middleware.upload.array("imgUploader", 3), function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}

	Product.create({
		name: name, 
		price: price,
		description: description, 
		image: middleware.imagename
	}, function(err, product){
		if(err){
			req.flash("error", "Something went wrong");
			console.log("Could not add comment");
		}else{
			product.author = author;
			product.save();
			req.flash("success", "Successfully added a product!");
		}
	});

	res.redirect("/products");
});

// ===============================================
// Show/View product
// ===============================================
router.get("/:product_id", function(req, res){
	Product.findById(req.params.product_id, function(err, foundProduct){
		if(err && !foundProduct){
			req.flash("error", "Shop not found");
			res.redirect("back");
		}else{
			res.render("./products/show", {product: foundProduct});
		}
	});
});

// ===============================================
// Edit Product
// ===============================================
router.get("/:product_id/edit", middleware.checkProductOunership, function(req, res){
	Shop.findById(req.params.id, function(err, foundShop){
		if(err || !foundShop){
			req.flash("error", "Product not found");
			res.redirect("back");
		}else{
			Product.findById(req.params.product_id, function(err, foundProduct){
				if(err || !foundProduct){
					req.flash("error", "Product not found");
					res.redirect("back");
				}else{
					res.render("products/edit", {product: foundProduct});
				}
			});
		}
	});
});

// router.put("/:product_id", middleware.checkProductOunership, middleware.upload.array("imgUploader", 3), function(req, res){
//     Product.findById(req.params.product_id, function(err, foundProduct){
//         if(err || !foundProduct){
//             req.flash("error", "Product not found");
//             res.redirect("back");
//         }else{
//             middleware.delete(foundProduct.image); 
//             req.body.product.image = middleware.imagename;
//             Product.findByIdAndUpdate(req.params.product_id, req.body.product, function(err, updatedProduct){
//                 if(err || !updatedProduct){
//                     req.flash("error", "Product not found");
//                     res.redirect("back");
//                 }else{              
//                     res.redirect("/show/"+req.params.id);   
//                 }
//             });
//         }
//     });
// });

// ===============================================
// All products
// ===============================================
router.get("/", function(req, res){
	Product.find({}, function(err, allProducts){
		if(err || !allProducts){
			req.flash("error", "Product not found");
			res.redirect("back")
		}else{
			res.render("./products/index", {products: allProducts});
		}
	});
});

// ===============================================
// Delete Product
// ===============================================
router.delete("/:product_id", middleware.checkProductOunership, function(req, res){
    Product.findById(req.params.product_id, function(err, foundProduct){
        if(err || !foundProduct){
            req.flash("error", "Something went wrong!!");
            res.redirect("/show/"+req.params.id);
        }else{
            Product.findByIdAndDelete(req.params.product_id, function(err, deletedProduct){
                if(err && !deletedProduct){
                    req.flash("error", "Product not found");
                    res.redirect("back");
                }else{
                    middleware.delete(foundProduct.image);
                    req.flash("success", "Product deleted");
                    res.redirect("/show/"+req.params.id); 
                }
            });
        }
    });
});

// router.get("/", function(req, res){
// 	// res.send("Landing page");
// 	res.render("products");
// });

module.exports = router;