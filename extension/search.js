// Global variables
var tr, div;

function search(search_string){
  var results = [];
  for (var search_key in search_data){
    if (search_key.toLowerCase().indexOf(search_string) > -1) {
      results.push(search_data[search_key]["Result"]);
    };
  };
  return results;
};

function clear_table(){
  //Remove any old elements of table
  var table = document.getElementById("result_table")
  table.innerHTML = '';
  return table;
};

function build_table(search, response){
  var table = clear_table();
  var cells = [];
  for (var idx in response){
    if (response[idx].substring(0,4).toLowerCase() === search){
      var r = response[idx];
      response.splice(idx, 1); // Remove from current position
      response.unshift(r); // Add to beginning
      break;
    }
  }

  for (var idx in response){
    var row, cell;
    // Add cell and populate with text
    row = table.insertRow(idx);
    cell = row.insertCell(0);
    cell.innerHTML = response[idx];
    cell.className = "result_td"

    // Add stripe formatting
    cell.style.backgroundColor = (!!(idx&1)? "rgba(0,0,0,.05)" : "rgba(0,0,0,0)");
  };
};

async function search_and_display(user_input){
  var search_string = document.getElementById("input_box").value.toLowerCase();
  if (search_string.length < 2){
    clear_table();
  } else {
    const response = await search(search_string);

    await build_table(search_string, response);
  };
};


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("input_box").addEventListener("keyup", search_and_display);

});
