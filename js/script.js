var matchday = 1;
var name = "Matchday " + matchday;
var winners, losers = "";

var date, teamname, teamekey, teamcode, opposition, oppositioncode, oppositionkey, teamscore, oppositionscore, nextgame, teamhash;

//Get Score for team
function getScore() {
  document.getElementById("spinner").style.display = "block";
  $('.spinner').show();
  var md = document.getElementById("matchdaycustom");
  var matchday = md.options[md.selectedIndex].value;

  var tm = document.getElementById("teamselect");
  var team = tm.options[tm.selectedIndex].value;

  console.log("Selected Team " + teamarray[team].name);
  console.log ("Selected Matchday:  " + matchday);

  console.log("Connecting...")

  $.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json", function(results) {
    console.log("Connected!");
    date = results.rounds[matchday].matches[matchday].date;

    for(var i = 0; i < results.rounds.length; i++){
            if(i == matchday){
                for (var j=0; j< results.rounds[matchday].matches.length; j++){
                     if(results.rounds[matchday].matches[j].team1.name == teamarray[team].name){
                        teamname = results.rounds[i].matches[j].team1.name;
                        teamekey = results.rounds[i].matches[j].team1.key;
                        teamecode = results.rounds[i].matches[j].team1.code;
                        teamhash = "#" + results.rounds[i].matches[j].team1.code;

                        opposition = results.rounds[i].matches[j].team2.name;
                        oppositioncode = results.rounds[i].matches[j].team2.code;
                        oppositionkey = results.rounds[i].matches[j].team2.key;

                        teamscore = results.rounds[i].matches[j].score1;
                        oppositionscore = results.rounds[i].matches[j].score2;
                        date = results.rounds[i].matches[j].date;

                        setTimeout(displayResults, 2000);
                        function displayResults() {
                          $('.spinner').hide();
                          document.getElementById("result").innerHTML = teamname + ' ' + teamscore + ' : ' + oppositionscore + ' ' + opposition;
                          document.getElementById('resultContainer').style.display = 'block';
                        }
                     }
                     else if(results.rounds[matchday].matches[j].team2.name == teamarray[team].name){
                        teamname = results.rounds[i].matches[j].team2.name;
                        teamekey = results.rounds[i].matches[j].team2.key;
                        teamecode = results.rounds[i].matches[j].team2.code;
                        teamhash = "#" + results.rounds[i].matches[j].team2.code;

                        opposition = results.rounds[i].matches[j].team1.name;
                        oppositioncode = results.rounds[i].matches[j].team1.code;
                        oppositionkey = results.rounds[i].matches[j].team1.key;

                        teamscore = results.rounds[i].matches[j].score2;
                        oppositionscore = results.rounds[i].matches[j].score1;
                        date = results.rounds[i].matches[j].date;

                        setTimeout(displayResults, 2000);
                        function displayResults() {
                          $('.spinner').hide();
                          document.getElementById("result").innerHTML = opposition + ' ' + oppositionscore + ' : ' + teamscore + ' ' + teamname;
                          document.getElementById('resultContainer').style.display = 'block';
                        }


                     }
                }
            }
        }
    console.log("All required successfully data gathered!")
  });
}

//Create Loading Icon
$(document).ready(function () {
    $('.spinner').hide();
    document.getElementById("matchdaycustom").disabled = true;
    $(document).on('change', 'input[Id="chkproperty"]', function (e) {
      if(this.checked) {
        document.getElementById("matchdaycustom").disabled = true;
        $("#matchdaycustom").val("0");
      }
      else {
        document.getElementById("matchdaycustom").disabled = false;
      }
    })
    $('select').on('change', function (e) {
      document.getElementById('resultContainer').style.display = 'none';
      document.getElementById("tweet").innerHTML = " ";

    });
});

//Tweet Logic
function tweetLogic() {
  console.log("Connecting...")
  $.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json", function(results) {
    console.log("Connected!");
    var md = document.getElementById("matchdaycustom");
    var matchday = md.options[md.selectedIndex].value;

    var tm = document.getElementById("teamselect");
    var team = tm.options[tm.selectedIndex].value;

    var nextgameno = matchday ++;
    for(var i = 0; i < results.rounds.length; i++){
            if(i == matchday){
                for (var j=0; j< results.rounds[nextgameno].matches.length; j++){
                     if(results.rounds[nextgameno].matches[j].team1.name == teamarray[team].name){
                        var nextgamestring = results.rounds[i].matches[j].team2.key;
                        console.log("Here: " + nextgamestring);
                        nextgame = nextgamestring.charAt(0).toUpperCase() + nextgamestring.slice(1);
                        console.log(nextgame);
                     }
                     else if(results.rounds[nextgameno].matches[j].team2.name == teamarray[team].name){
                        var nextgamestring = results.rounds[i].matches[j].team1.key;
                        nextgame = nextgamestring.charAt(0).toUpperCase() + nextgamestring.slice(1);
                      }
                 }
            }
      }
      console.log("All required successfully data gathered!")
      buildTweet();
    })
}

function buildTweet() {
  console.log(nextgame);

  if(teamscore > oppositionscore) {
    result = 1;
    document.getElementById("tweet").innerHTML = victoryTweets[0] + nextgame + "! " + teamhash;
  } else if(teamscore == oppositionscore) {
    result = 2;
    document.getElementById("tweet").innerHTML = drawTweets[0] + nextgame + " " + teamhash;
  } else {
    result = 3;
    document.getElementById("tweet").innerHTML = lossTweets[0] + nextgame + ". " + teamhash;
  }
}


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
