
// Dependencies
// ===========================================================
const express = require("express");
const path = require ("path");
var html = require('./app/routing/htmlRoutes');
var api = require("./app/routing/apiRoutes")


var app = express();
var PORT = process.env.PORT || 80;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
// var public= require('path').join(__dirname,'/public');
// app.use( express.static( public ) );
// Routes
// ===========================================================
app.use("/api/friends", api);
app.use('/', html);


// Starts our server
 app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
  });