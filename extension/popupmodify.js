function clearHtml(source){
  /* Input: source, an element. Clears any children appended to an element*/
  while (source.firstChild){
    source.removeChild(source.firstChild);
  }
  
  return;
}


function modifyPopup(submission){
  /* Input: submission, a user-submitted string
  
  Calls functions from parser.js to identify user-submitted string.
  Calls clearHtml() to remove any previous results in the popup's "results" div.
  Formats and displays the results from parser.js functions in the popup.
  */
  
  var code, output, temp;
  
  //for putative codes
  if (submission.length == 4) {
    code = submission.toUpperCase();
    output = identifyCode(code); 
  }
  
  //for putative species
  else {
    console.log(submission);
    
    //to match dictionary key formatting, strip submission of 
    //punctuation & spaces and make uppercase
    temp = submission;
    temp = temp.match(/\w/g).join("");
    temp = temp.toUpperCase();
 
    console.log(temp);
    code = identifySpecies(temp);
    console.log(code);
    output = identifyCode(code);
  }
  
  //div into which results are put has id = "results"
  var result = document.getElementById("results");
  var line1 = false; //used for initial result: corresponding species or 
                     //indication there is none 
  var line2 = false; //used for a single confusion species
  var list = [];  //used for multiple confusion species
  
  //clear div
  clearHtml(result);
  
  //output=false if user input not found in dictionary
  if (!output) {
    if (submission.length == 4){
      line1 = 'Code "'+code+'" not found.';
    }
    else{
      line1 = 'Species "'+submission+'" not found.';
    }
  }
  //output includes * if there are code conflicts;
  //output includes ~ if code is not in use
  else if (output.includes("*")){
    //split into name (split[0]) and conflicts (split[1])
    var split = output.split('*');
    
    //if code is not in use due to conflicts
    if (output[0].includes("~")){
      console.log("* and ~");
      line1 = "Code not in use.";
    }
    //code in use but there are confusion species
    else {
      console.log("*");
      line1 = code + ": " + split[0];
    }
    //if there are multiple confusion species
    if (split[1].includes(";")){
      list = split[1].split(";");
    }
    //if there is just one confusion species
    else {
      line2 = split[1];
    }
  }
  //just a normal alpha code
  else {
    console.log("normal code");
    line1 = code + ": " + output;
  }
  
  
  //append initial result
  result.appendChild(document.createTextNode(line1));
  
  //if there is one confusion species, append it
  if (line2){
    result.appendChild(document.createElement("br"));
    result.appendChild(document.createElement("br"));
    result.appendChild(document.createTextNode("Confusion species:"));
    result.appendChild(document.createElement("br"));
    result.appendChild(document.createTextNode(line2));
  }
  
  //if there are multiple confusion species, append them
  else if (list[0]) {
    result.appendChild(document.createElement("br"));
    result.appendChild(document.createElement("br"));
    result.appendChild(document.createTextNode("Confusion species:"));
    numSp = list.length;
    for (i=0; i < numSp; i++){
      result.appendChild(document.createElement("br"));
      result.appendChild(document.createTextNode(list[i]));
    }
  }
}

