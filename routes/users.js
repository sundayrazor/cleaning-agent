var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var ValidatePassword = require("validate-password");
var router = express.Router();

var validator = new ValidatePassword();

var passwordData = validator.checkPassword('aa1aa,1');
 
// console.log(passwordData.isValid); // false
// console.log(passwordData.validationMessage); // 'The password must contain at least one uppercase letter'

//Regiser
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var role = 0;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	User.register(new User({role: role, username: username, email: email}), password, function(err, user){
		if(err || !user){
			req.flash("error", err.message);
			return res.render("register");
		}else{
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Wecome to myFavShop "+user.username);
				res.redirect("/");
			});
		}
	});
});

//Login
router.get("/login", function(req, res){
	res.render("login", {message: req.flash("error")});
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	badRequestMessage : 'Missing username or password.',
	failureFlash : true
	}), function(req, res){
});

//Logout
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged You Out!!");
	res.redirect("products");
});

module.exports = router;