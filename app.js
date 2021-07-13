//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { futimesSync } = require("fs");

const app = express()

app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const articleSchema = {
    title:String,
    content:String
};

const Article = mongoose.model("Article", articleSchema);


app.get("/articles",function(req,res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }
        else {
            res.send(err);
        }
    });
})
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true});
app.listen(3000, function(){
    console.log("Server started on per 3000");
});