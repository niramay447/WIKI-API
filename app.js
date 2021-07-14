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

app.route("/articles").get(
    function(req,res){
        Article.find(function(err, foundArticles){
            if(!err){
                res.send(foundArticles);
            }
            else {
                res.send(err);
            }
        });
    }
)
.post(
    function(req,res){
        console.log(req.body.title);
        console.log(req.body.content);
    
        const newArticle = new Article({
            title:req.body.title,
            content : req.body.content
        });
    
        newArticle.save(function(err){
            if(!err){
                res.send("Successfully added a new article");
            } else {
                res.send(err);
            }
        })
    }
)
.delete(
    function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles");
        }
        else{
            res.send(err);
        }
    });
});

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true});
app.listen(3000, function(){
    console.log("Server started on per 3000");
});