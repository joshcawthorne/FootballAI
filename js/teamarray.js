//This is our (incomplete) array

var teamarray = [
  {"name": "Arsenal", "code": "ARS", "key": "arsenal"},
  {"name": "Chelsea", "code": "CHE", "key": "chelsea"},
]

function testArray() {
  //These commands output text to the log.

  console.log(teamarray[0].name); // This Would output 'Arsenal'
  console.log(teamarray[1].code); // This Would output 'CHE'

  //Now we replace the number with a var generated by the user

  var chosenteam = 1;

  console.log(teamarray[chosenteam].key); //This would output 'chelsea'
}
