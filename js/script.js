var matchday = 1;
var name = "Matchday " + matchday;

$.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json", function(results) {
  var winners, losers = "";
  console.log("Connected");
  console.log(results.rounds[matchday].name + " was played on " + results.rounds[matchday].matches[matchday].date);
  console.log("The teams were " + results.rounds[4].matches[4].team1.name + " vs " + results.rounds[4].matches[4].team2.name);
  console.log("The score was " + results.rounds[4].matches[4].score1 + " - " + results.rounds[4].matches[4].score2);
  if (results.rounds[4].matches[4].score1 > results.rounds[4].matches[4].score2) {
      winners = results.rounds[4].matches[4].team1.name;
      losers = results.rounds[4].matches[4].team2.name
      console.log("Therefore, " + winners + " won the game.")
  }
  else if (results.rounds[4].matches[4].score1 == results.rounds[4].matches[4].score2) {
      console.log("Therefore, it was a draw");
  }
  else {
      console.log("Therefore, " + results.rounds[4].matches[4].team2.name + " won the game.")
  }
});

/* -- Legacy Code -- */

/* -- Code to get team name, key and code --

$.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2015-16/en.1.clubs.json", function(results) {
  document.getElementById("key").innerHTML= "Club Key: " + results.clubs[5].key;
  document.getElementById("name").innerHTML= "Club Name: " + results.clubs[5].name;
  document.getElementById("code").innerHTML= "Club Code: " + results.clubs[5].code;
});
