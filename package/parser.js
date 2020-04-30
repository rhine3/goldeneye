/* parser.js
Both functions in this file are used in conjunction with the dictionaries 
in dictionaries.js to identify species names from codes or vice-versa.
*/


function identifyCode(input) {
  // don't process a boolean input
  // (identifySpecies will returns a bool when no specific match is found)
  if (typeof input === "boolean") return input;

  if (input in code_keys){
    console.log("code exists");
    return code_keys[input];
  }
  else{
    // searching for matches that start with a certain code is almost pointless because almost any 3 letter combination
    // will have multiple matches. Therefore no searching of codes.

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
    var matches = [];
    var matcher = new RegExp('^.*' + input + '.*',"g");

    for (var species in species_keys) {
      if (!species_keys.hasOwnProperty(species)) continue;
      if (species.match(matcher)) {
        matches.push(species_keys[species])
        if (matches.length > 1) {
          // no sense checking more. there were too many matches.
          break;
        }
      }
    }

    if (matches.length > 1) {
      console.log("too many results");
      return true;
    }
    else if (matches.length === 1) {
      // only return if there was just 1 match. this is because identifyCode() is not setup to take more than one
      // code as input (and that is what the result of this function is used for
      return matches[0];
    }


    console.log("species doesn't exist");
    return false;
  }
}