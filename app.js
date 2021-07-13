const express = require("express");
const mongoose = requir("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { futimesSync } = require("fs");

const app = express()

app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("Server started on per 3000");
});