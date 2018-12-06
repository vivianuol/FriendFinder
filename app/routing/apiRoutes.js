var express  = require('express');
const path = require ("path");
var fs = require("fs");
var api = express.Router();
var app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

api.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/../data/friends.json"));
});


api.post('/', function (req, res) {
    
    var clientData=[];

    clientData =JSON.parse(fs.readFileSync("app/data/friends.json", "utf8"));
    console.log("clientData: " + clientData);

    console.log("currentUser: " + req.body);
    var currentUser = req.body;

    var bestMatch = {
        name:"",
        image:"",
        answers: [],
        totalScore: Infinity
    };



    for (var i=0; i<clientData.length; i++) {
        var totalScore = 0;
        for (var j=0; j<clientData[i].answers.length; j++) {
            var difference=Math.abs(currentUser.answers[j]-clientData[i].answers[j]);
            
            console.log("Difference: " + difference);
        
            totalScore = totalScore + difference;
            console.log(totalScore)
    
        }

        console.log("totalScore: " )

        if(totalScore<bestMatch.totalScore){
            bestMatch.name = clientData[i].name;
            bestMatch.image = clientData[i].image;
            bestMatch.answers = clientData[i].answers;
            bestMatch.totalScore = totalScore;
        }

        console.log("bestMatch: " + JSON.stringify(bestMatch))
    }
    

    clientData.push(currentUser);
    console.log("clientData:" + clientData);
    

    var client = JSON.stringify(clientData)
    console.log("client:" + client);

    fs.writeFile("app/data/friends.json", client, function(err) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('The file has been saved!');
    });

//JSON.stringify(bestMatch)
console.log(bestMatch);
    res.json(bestMatch);
})

module.exports = api;