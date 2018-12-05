var fs = require("fs");

var data = JSON.parse(fs.readFileSync("friends.json", "utf8"));
// var answer = JSON.parse(fs.readFile("friends.json", "utf8"));

console.log(data);
console.log(data[1].answers);

var currentUser = {
    answer: [2,2,2,2,2,2,2,2,2,2]
};


var bestMatch = {
    name:"",
    image:"",
    answers: [],
    totalScore: Infinity
};

console.log("bestMatch Before: " + JSON.stringify(bestMatch));

var totalScore = 0;

for (var i=0; i<data.length; i++) {
    for (var j=0; j<data[i].answers.length; j++) {
        difference=Math.abs(currentUser.answer[j]-parseInt(data[i].answers[j]));
        
        console.log("difference" + difference);
    
        totalScore = totalScore + difference;
        console.log(totalScore)

    }


    if(totalScore<bestMatch.totalScore){
        bestMatch.name = data[i].name;
        bestMatch.image = data[i].image;
        bestMatch.answers = data[i].answers;
        bestMatch.totalScore = totalScore;
    }

    console.log("bestMatch after: " + JSON.stringify(bestMatch))
}

    