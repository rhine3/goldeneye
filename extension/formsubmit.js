/*
File formsubmit.js listens for user to submit input. When input is submitted, it runs main(),
which gives the input to identify(). The output from identify() is then passed on by main() 
to modifyPopup(), which formats the output according to whether it finds:
 - asterisks (indicating conflicting species)
 - tildes (indicating "code is logical but not in use") 

*/

function main(event) {
  event.preventDefault(); //stops appended divs from automatically refreshing after form submits
  var input = document.getElementById('myform').elements[0].value;
  console.log("user input: " + input);
  
  if (input.length > 0){ //don't react to empty input
    modifyPopup(input);
  }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myform").addEventListener("submit", main);
    
});