//This is our (incomplete) array

var teamarray = [
  {"name": "Arsenal", "code": "ARS", "key": "arsenal"},
  {"name": "Bournemouth", "code": "BOU", "key": "bournemouth"},
  {"name": "Burnley", "code": "BUR", "key": "burnley"},
  {"name": "Chelsea", "code": "CHE", "key": "chelsea"},
  {"name": "Crystal Palace", "code": "CRY", "key": "crystalpalace"},
  {"name": "Everton", "code": "EVE", "key": "everton"},
  {"name": "Hull City", "code": "HUL", "key": "hull"},
  {"name": "Leicester City", "code": "LEI", "key": "leicester"},
  {"name": "Liverpool", "code": "LIV", "key": "liverpool"},
  {"name": "Manchester City", "code": "MCI", "key": "mancity"},
  {"name": "Manchester United", "code": "MUN", "key": "manutd"},
  {"name": "Middlesbrough", "code": "MFC", "key": "middlesbrough"},
  {"name": "Southampton", "code": "SOU", "key": "southampton"},
  {"name": "Stoke City", "code": "STK", "key": "stoke"},
  {"name": "Sunderland", "code": "SUN", "key": "sunderland"},
  {"name": "Swansea", "code": "SWA", "key": "swansea"},
  {"name": "Tottenham Hotspur", "code": "TOT", "key": "tottenham"},
  {"name": "Watford", "code": "WAT", "key": "watford"},
  {"name": "West Bromwich Albion", "code": "WBA", "key": "westbrom"},
  {"name": "West Ham United", "code": "WHU", "key": "westham"},


]

function testArray() {
  //These commands output text to the log.

  console.log(teamarray[0].name); // This Would output 'Arsenal'
  console.log(teamarray[1].code); // This Would output 'CHE'

  //Now we replace the number with a var generated by the user

  var chosenteam = 1;

  console.log(teamarray[chosenteam].key); //This would output 'chelsea'
}
