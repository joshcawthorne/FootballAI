var matchday = 1;
var name = "Matchday " + matchday;
var winners, losers = "";

var date, teamekey, teamcode, opposition, oppositioncode, oppositionkey, teamscore, oppositionscore, nextgame, teamhash, homelocation, nextgamehomelocation;
var teamname = "Arsenal";

//Get Score for team
function getScore() {
  document.getElementById("spinner").style.display = "block";
  $('.spinner').show();
  var md = document.getElementById("matchdaycustom");
  var matchday = md.options[md.selectedIndex].value;

  var tm = document.getElementById("teamselect");
  var team = tm.options[tm.selectedIndex].value;

  console.log("Selected Team " + teamarray[team].name);
  console.log ("Selected Matchday: " + matchday);

  console.log("Connecting...")
  console.log("Reason: Base data dump.")

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

                        homelocation = true;

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

                        homelocation = false;

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
  console.log("Reason: Next game info")
  $.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json", function(results) {
    console.log("Connected!");
    var md = document.getElementById("matchdaycustom");
    var matchday = md.options[md.selectedIndex].value;

    var tm = document.getElementById("teamselect");
    var team = tm.options[tm.selectedIndex].value;
    var number = parseInt(matchday.substring(matchday) , 10 ) + 1;
    var nextgameno = number;
    console.log("Next Game: " + nextgameno);

    console.log("Next Matchday: " + nextgameno);
    for(var i = 0; i < results.rounds.length; i++){
            if(i == nextgameno){
                for (var j=0; j< results.rounds[nextgameno].matches.length; j++){
                     if(results.rounds[nextgameno].matches[j].team1.name == teamarray[team].name){
                        var nextgamestring = results.rounds[i].matches[j].team2.key;
                        nextgame = nextgamestring.charAt(0).toUpperCase() + nextgamestring.slice(1);
                        nextgamehomelocation = true;
                        console.log("Next game is against" + nextgame + ", at home.");
                     }
                     else if(results.rounds[nextgameno].matches[j].team2.name == teamarray[team].name){
                        var nextgamestring = results.rounds[i].matches[j].team1.key;
                        nextgame = nextgamestring.charAt(0).toUpperCase() + nextgamestring.slice(1);
                        nextgamehomelocation = false;
                        console.log("Next game is against " + nextgame + ", away from home.");

                      }
                 }
            }
      }
      console.log("All required successfully data gathered!")
      buildTweet();
    })
}

function buildTweet() {
  if(teamscore > oppositionscore) {
    result = 1;
  } else if(teamscore == oppositionscore) {
    result = 2;
  } else {
    result = 3;
  }

  if(matchday == 3 || matchday > 3) {
    newseason = true;
  }
  else {
    newseason = false;
  }

  if(!newseason) {
    console.log("Connecting...")
    console.log("Reason: Past results info.")
    $.getJSON("https://raw.githubusercontent.com/opendatajson/football.json/master/2016-17/en.1.json", function(results) {
      console.log("Connected!");

      var md = document.getElementById("matchdaycustom");
      var matchday = md.options[md.selectedIndex].value;
      var tm = document.getElementById("teamselect");
      var team = tm.options[tm.selectedIndex].value;

      var number = parseInt(matchday.substring(matchday) , 10 ) + 1;
      var game1 = number - 1;
      console.log(game1);
      var game2 = number - 2;
      var game3 = number - 3;
      var loss = 0;
      var draw = 0;
      var win = 0;

      if(matchday > 2) {
        for(var i = 0; i < results.rounds.length; i++){
                if(i == game1){
                    for (var j=0; j< results.rounds[game1].matches.length; j++){
                         if(results.rounds[game1].matches[j].team1.name == teamarray[team].name){
                            var homeresult = results.rounds[i].matches[j].score1;
                            var opporesult = results.rounds[i].matches[j].score2;
                            console.log(homeresult + " " + opporesult);
                            if (homeresult > opporesult) {
                              win ++;
                            }
                            else if(homeresult == opporesult){
                              draw ++;
                            }
                            else{
                              loss ++;
                            }
                         }
                         else if(results.rounds[game1].matches[j].team2.name == teamarray[team].name){
                            var homeresult = results.rounds[i].matches[j].score2;
                            var opporesult = results.rounds[i].matches[j].score1;
                            console.log(homeresult + " " + opporesult);
                            if (homeresult > opporesult) {
                              win ++;
                            }
                            else if(homeresult == opporesult){
                              draw ++;
                            }
                            else{
                              loss ++;
                            }
                          }
                     }
                }
          }
          console.log("Game one before data gathered...")
          console.log("Wins: " + win + " Draws: " + draw + " Losses: "+ loss);

        /*for(var i = 0; i < results.rounds.length; i++){
                if(i == game2){
                  for (var j=0; j< results.rounds[game2].matches.length; j++){
                       if(results.rounds[game2].matches[j].team1.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score1;
                          var opporesult = results.rounds[i].matches[j].score2;
                          if (homeresult > opporesult) {
                            win ++;
                          }
                          else if(homeresult == opporesult){
                            draw ++;
                          }
                          else{
                            loss ++;
                          }
                       }
                       else if(results.rounds[game2].matches[j].team2.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score2;
                          var opporesult = results.rounds[i].matches[j].score1;
                          if (homeresult > opporesult) {
                            win ++;
                          }
                          else if(homeresult == opporesult){
                            draw ++;
                          }
                          else{
                            loss ++;
                          }
                        }
                }
          }
          console.log("Game two before data gathered...")
        }

        for(var i = 0; i < results.rounds.length; i++){
                if(i == game3){
                  for (var j=0; j< results.rounds[game3].matches.length; j++){
                       if(results.rounds[game3].matches[j].team1.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score1;
                          var opporesult = results.rounds[i].matches[j].score2;
                          if (homeresult > opporesult) {
                            win ++;
                          }
                          else if(homeresult == opporesult){
                            draw ++;
                          }
                          else{
                            loss ++;
                          }
                       }
                       else if(results.rounds[game3].matches[j].team2.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score2;
                          var opporesult = results.rounds[i].matches[j].score1;
                          if (homeresult > opporesult) {
                            win ++;
                          }
                          else if(homeresult == opporesult){
                            draw++;
                          }
                          else{
                            loss++;
                          }
                        }
                }
          }
        console.log("Game three before data gathered...")
        console.log("Analysing results...")
        console.log("Wins: " + win + " Draws: " + draw + " Losses: "+ loss);
      }*/
      }

  document.getElementById("tweet").innerHTML = victoryTweets[0] + nextgame + "! " + teamhash;
  document.getElementById("tweet").innerHTML = drawTweets[0] + nextgame + " " + teamhash;
  document.getElementById("tweet").innerHTML = lossTweets[0] + nextgame + ". " + teamhash;
  });
}}


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
