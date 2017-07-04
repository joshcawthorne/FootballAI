var date, teamekey, teamcode, opposition, oppositioncode, oppositionkey, teamscore, oppositionscore, nextgame, teamhash, homelocation, nextgamehomelocation, gameresult, winners, losers, nextteamname;
var matchday = 1;
var name = "Matchday " + matchday;
var teamname = "Arsenal";

//Tasks to perform instantly
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

  console.log("Connecting...");
  console.log("Reason: Base data dump.");
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
    console.log("Disconnected.")
  });
}

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
    var nextgameno = matchday + 1;
    var nextgameremove = nextgameno.replace(/^0+/, '');
    var nextgame = parseInt(nextgameno, 10);
    var nextgameconv = nextgame.toString();

    for(var i = 0; i < results.rounds.length; i++){
            if(i == nextgameconv){
                for (var j=0; j< results.rounds[nextgameconv].matches.length; j++){
                     if(results.rounds[nextgameconv].matches[j].team1.name == teamarray[team].name){
                        var nextgamestring = results.rounds[i].matches[j].team2.key;
                        nextteamname = nextgamestring.charAt(0).toUpperCase() + nextgamestring.slice(1);
                        nextgamehomelocation = true;
                        console.log("Next game is against" + nextgame + ", at home.");
                     }
                     else if(results.rounds[nextgameconv].matches[j].team2.name == teamarray[team].name){
                        var nextgamestring = results.rounds[i].matches[j].team1.key;
                        nextteamname = nextgamestring.charAt(0).toUpperCase() + nextgamestring.slice(1);
                        nextgamehomelocation = false;
                        console.log("Next game is against " + nextgame + ", away from home.");
                    }
                }
           }
      }
      console.log("All required successfully data gathered!")
      console.log("Disconnected.")
      buildTweet();
    })
}

function buildTweet() {
  if(teamscore > oppositionscore) {
    result = 1;
    gameresult = "Win";
  } else if(teamscore == oppositionscore) {
    result = 2;
    gameresult = "Draw";
  } else {
    result = 3;
    gameresult = "Loss";
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
      var nextgameremove1 = matchday.replace(/^0+/, '');
      var nextgame1 = parseInt(nextgameremove1, 10) - 1;
      var game1 = nextgame1.toString();
      var nextgameremove2 = matchday.replace(/^0+/, '');
      var nextgame2 = parseInt(nextgameremove2, 10) - 2;
      var game2 = nextgame2.toString();
      var nextgameremove3 = matchday.replace(/^0+/, '');
      var nextgame3 = parseInt(nextgameremove3, 10) - 3;
      var game3 = nextgame3.toString();
      var game1result, game2result, game3result;
      var loss = 0;
      var draw = 0;
      var win = 0;

      if(result == 1){
        win ++;
      }
      else if(result == 2){
        draw ++;
      }
      else{
        loss ++;
      }

      if(matchday > 2) {
        for(var i = 0; i < results.rounds.length; i++){
                if(i == game1){
                    for (var j=0; j< results.rounds[game1].matches.length; j++){
                         if(results.rounds[game1].matches[j].team1.name == teamarray[team].name){
                            var homeresult = results.rounds[i].matches[j].score1;
                            var opporesult = results.rounds[i].matches[j].score2;
                            if (homeresult > opporesult) {
                              win ++;
                              game1result = "Win";
                            }
                            else if(homeresult == opporesult){
                              draw ++;
                              game1result = "Draw";
                            }
                            else{
                              loss ++;
                              game1result = "Loss";
                            }
                         }
                         else if(results.rounds[game1].matches[j].team2.name == teamarray[team].name){
                            var homeresult = results.rounds[i].matches[j].score2;
                            var opporesult = results.rounds[i].matches[j].score1;
                            if (homeresult > opporesult) {
                              win ++;
                              game1result = "Win";
                            } else if(homeresult == opporesult){
                              draw ++;
                              game1result = "Draw";
                            } else {
                              loss ++;
                              game1result = "Loss";
                            }
                        }
                    }
                }
                if(i == game2) {
                  for (var j=0; j< results.rounds[game2].matches.length; j++){
                       if(results.rounds[game2].matches[j].team1.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score1;
                          var opporesult = results.rounds[i].matches[j].score2;
                          if (homeresult > opporesult) {
                            win ++;
                            game2result = "Win";
                          } else if(homeresult == opporesult){
                            draw ++;
                            game2result = "Draw";
                          } else{
                            loss ++;
                            game2result = "Loss";
                          }
                       }
                       else if(results.rounds[game2].matches[j].team2.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score2;
                          var opporesult = results.rounds[i].matches[j].score1;
                          if (homeresult > opporesult) {
                            win ++;
                            game2result = "Win";
                          }
                          else if(homeresult == opporesult){
                            draw ++;
                            game2result = "Draw";
                          }
                          else{
                            loss ++;
                            game2result = "Loss";
                          }
                        }
                      }
                }
                if(i == game3){
                  for (var j=0; j< results.rounds[game3].matches.length; j++){
                       if(results.rounds[game3].matches[j].team1.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score1;
                          var opporesult = results.rounds[i].matches[j].score2;
                          if (homeresult > opporesult) {
                            win ++;
                            game3result = "Win";
                          }
                          else if(homeresult == opporesult){
                            draw ++;
                            game3result = "Draw";
                          }
                          else{
                            loss ++;
                            game3result = "Loss";
                          }
                       }
                       else if(results.rounds[game3].matches[j].team2.name == teamarray[team].name){
                          var homeresult = results.rounds[i].matches[j].score2;
                          var opporesult = results.rounds[i].matches[j].score1;
                          if (homeresult > opporesult) {
                            win ++;
                            game3result = "Win";
                          }
                          else if(homeresult == opporesult){
                            draw++;
                            game3result = "Draw";
                          }
                          else{
                            loss++;
                            game3result = "Loss";
                          }

                      }
                  }
              }
          }
          console.log("Past game data gathered...")
          console.log("Disconnected.")
          console.log("Key facts: ")
          console.log("Chosen team: " + teamname);
          console.log("The last game was a " + gameresult);
          console.log("The game before that was a " + game1result);
          console.log("The game before that was a " + game2result);
          console.log("The game before that was a " + game3result);
          console.log("Therefore, " + teamname + " have had... Wins: " + win + " Draws: " + draw + " Losses: "+ loss);
          if(homelocation == true) {
            console.log("Last game was played at home.")
          } else {
            console.log("Last game was played away.")
          }
          if(nextgamehomelocation == true) {
            console.log("Next game is to be played at home.")
          } else {
            console.log("Next game is to be played away.")
          }
      }
  document.getElementById("tweet").innerHTML = victoryTweets[0] + nextteamname + "! " + teamhash;
  document.getElementById("tweet").innerHTML = drawTweets[0] + nextteamname + " " + teamhash;
  document.getElementById("tweet").innerHTML = lossTweets[0] + nextteamname + ". " + teamhash;
  });
}}
