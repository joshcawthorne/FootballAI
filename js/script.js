var matchday = 1;
var name = "Matchday " + matchday;
var winners, losers = "";

var date, team, opposition, teamscore, oppositionscore;

function getScore() {

  var md = document.getElementById("matchdaycustom");
  var matchday = md.options[md.selectedIndex].value;

  var tm = document.getElementById("teamselect");
  var team = tm.options[tm.selectedIndex].value;

  console.log("team " + teamarray[team].name);

  var teams = "Hull City";

  console.log ("Selected Team:  " + teamarray[team]);
  console.log ("Selected Matchday:  " + matchday);

  console.log("Connecting...")

  $.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json", function(results) {
    console.log("Connected!");
    date = results.rounds[matchday].matches[matchday].date;

    for(var i = 0; i < results.rounds.length; i++){
            if(i == matchday){
                for (var j=0; j< results.rounds[matchday].matches.length; j++){
                     if(results.rounds[matchday].matches[j].team1.name == teamarray[team].name){
                        console.log(results.rounds[i].matches[j].team1.name);
                        console.log(results.rounds[i].matches[j].date);
                        console.log(results.rounds[i].matches[j].team2.name);
                        console.log(results.rounds[i].matches[j].score1);
                        console.log(results.rounds[i].matches[j].score2);
                     }
                  }
            }

        }

    team = results.rounds[4].matches[4].team1.name;
    opposition = results.rounds[4].matches[4].team2.name;
    teamscore = results.rounds[4].matches[4].score1;
    opposition = results.rounds[4].matches[4].score2;
    console.log("All required successfully data gathered!")
  });
}

$(document).ready(function () {
    document.getElementById("matchdaycustom").disabled = true;
    $(document).on('change', 'input[Id="chkproperty"]', function (e) {
      console.log("Clicked");
      if(this.checked) {
        document.getElementById("matchdaycustom").disabled = true;
        $("#matchdaycustom").val("0");
      }
      else {
        document.getElementById("matchdaycustom").disabled = false;
      }
    })
});


/* -- Legacy Code -- */

/* -- Code to get team name, key and code --

$.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2015-16/en.1.clubs.json", function(results) {
  document.getElementById("key").innerHTML= "Club Key: " + results.clubs[5].key;
  document.getElementById("name").innerHTML= "Club Name: " + results.clubs[5].name;
  document.getElementById("code").innerHTML= "Club Code: " + results.clubs[5].code;
});

  -- Code to get game stats --
  $.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json", function(results) {
    console.log("Connected!");
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
}

*/
