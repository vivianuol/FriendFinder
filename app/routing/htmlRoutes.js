//A GET Route to /survey which should display the survey page.
//A default, catch-all route that leads to home.html which displays the home page.

var express  = require('express');
const path = require ("path");
var router = express.Router();
var app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
// app.use('/assets', express.static('public'));

router.use(function (req, res, next) {
    console.log("path: " + req.path)
    if (req.path === "/survey" || req.path.startsWith("/assets/img/")) {
        next();
        return;
    } 

    console.log("dirname: " + __dirname)
    res.sendFile(path.join(__dirname + "/../public/home.html"));

});

router.get('/assets/img/*', function(req, res){
    console.log("full path: " + req.path);
    // console.log("img: " + __dirname);
    res.sendFile(path.join(__dirname + "/../public/" + req.path));
})

router.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
});

module.exports = router;