var express        = require("express"),
    app            = express(),
    mongoose       = require("mongoose"),
	passport       = require("passport"),
	flash          = require("connect-flash"),
	methodOverride = require("method-override"),
	User           = require("./models/user");
	
var	userRoutes     = require("./routes/users"),
	productRoutes  = require("./routes/products");

const bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");

app.use(bodyParser.json());
app.use(flash())

// Passport Configuration
app.use(require("express-session")({
	secret: "Mlapholo node js",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(User.serializeUser());

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next(); 
});

app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/business", {useNewUrlParser: true, useUnifiedTopology: true});

// var seedDB = require("./seeds");
// seedDB();


// =====================================
// HANDLING ROUTES
// =====================================
app.use(userRoutes);
app.use(productRoutes);

// =======================================
// Start Server
// =======================================
app.listen(process.env.PORT || 5000, "0.0.0.0", function(){
	console.log(process.env.PORT, "Server has started");
});