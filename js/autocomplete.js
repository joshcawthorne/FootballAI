$(function(){
  var teamarray = [
    {"value": "Arsenal", "data": "ARS"},
    {"value": "Bournemouth", "data": "BOU"},
    {"value": "Burnley", "data": "BUR"},
    {"value": "Chelsea", "data": "CHE"},
    {"value": "Crystal Palace", "data": "CRY"},
    {"value": "Everton", "data": "EVE"},
    {"value": "Hull City", "data": "HUL"},
    {"value": "Leicester City", "data": "LEI"},
    {"value": "Liverpool", "data": "LIV"},
    {"value": "Manchester City", "data": "MCI"},
    {"value": "Manchester United", "data": "MUN"},
    {"value": "Middlesbrough", "data": "MFC"},
    {"value": "Southampton", "data": "SOU"},
    {"value": "Stoke City", "data": "STK"},
    {"value": "Sunderland", "data": "SUN"},
    {"value": "Swansea", "data": "SWA"},
    {"value": "Tottenham Hotspur", "data": "TOT"},
    {"value": "Watford", "data": "WAT"},
    {"value": "West Bromwich Albion", "data": "WBA"},
    {"value": "West Ham United", "data": "WHU"}
  ];

  var teams = [
    "Arsenal",
    "Bournemouth",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Hull City",
    "Leicester City",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Middlesbrough",
    "Southampton",
    "Stoke City",
    "Sunderland",
    "Swansea",
    "Tottenham Hotspur",
    "Watford",
    "West Bromwich Albion",
    "West Ham United"
  ];

  // setup autocomplete function pulling from currencies[] array
  $('#autocomplete').autocomplete({
    lookup: teamarray,
    onSelect: function (suggestion) {
      var thehtml = '<strong>Currency value:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });

  $("#autocomplete").keypress(function(e) { if(e.which == 13) {
      event.preventDefault();
      var alert = document.getElementById('alert');
      alert.innerHTML = '';
      var entry = document.getElementById('autocomplete').value;

      if(entry.length == 0) {
        alert.innerHTML = alert.innerHTML + 'This works better when you enter a team.';
      } else {
        if( $.inArray(entry, teams) != -1){
          getScore();
        } else {
          alert.innerHTML = alert.innerHTML + "That doesn't look like a Premier League team to us... have another go.";
        }
      }
   } });

});
