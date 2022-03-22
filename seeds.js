var mongoose = require("mongoose");
var Product = require("./models/products");

var data = [
    {
        name: "Cat",
        image: "https://www.irishtimes.com/polopoly_fs/1.3205187.1504204659!/image/image.jpg_gen/derivatives/box_620_330/image.jpg",
        description: "Cats, also called domestic cats (Felis catus), are small, carnivorous (meat-eating) mammals, of the family Felidae. Domestic cats are often called house cats when kept as indoor pets. ... Their origin is probably the African Wildcat Felis silvestris lybica."
    },
    {
        name: "Dolphins",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Common_dolphin_noaa.jpg",
        description: "Dolphins have smooth, rubbery skin and are usually colored in some mixture of black, white, and gray. They have two flippers, or fins, on their sides, as well as a triangular fin on the back. Like other whales, they have an insulating layer of blubber (fat) beneath the skin."
    }
];

function seedDB(){
    Product.deleteMany({}, function(err, anm){
        if(err){
            console.log(err);
        }else{
            console.log("Removed Products", anm);
            // data.forEach(function(seed){
            //     Shop.create(seed, function(err, shop){
            //         if(err){
            //             console.log(err);
            //         }else{
            //             console.log("Added shop");
            //             Comment.create({
            //                 text: "I love this shop, Why is it like this",
            //                 author: "Hunter"
            //             }, function(err, comment){
            //                 if(err){
            //                     console.log(err);
            //                 }else{
            //                     shop.comments.push(comment);
            //                     shop.save();
            //                     console.log("New comment created");
            //                 }
            //             });
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedDB;