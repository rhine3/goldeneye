/* parser.js
Both functions in this file are used in conjunction with the dictionaries 
in dictionaries.js to identify species names from codes or vice-versa.
*/


function identifyCode(input) {
  if (input in code_keys){
    console.log("code exists");
    return code_keys[input];
  }
  else{
    console.log("code doesn't exist");
    return false;
  }
}


function identifySpecies(input) {
  if (input in species_keys){
    console.log("species exists");
    return species_keys[input];
  }
  else{
    console.log("species doesn't exist");
    return false;
  }
}