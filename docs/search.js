// Global variables
var tr, div;

function search(search_string){
  /*
  Search and return formatted results

  Searches through the keys of search_data, a global variable, a JSON with
  records of the format:
    {"CODE Species Name"}:{"Result":"Preformatted string"}
  e.g.
    {"ABDU American Black Duck":{"Result":"ABDU: American Black Duck<br>"}
  Returns the "Results" value of all matching records

  Args:
    search_string (string): the lowercased string to search for

  Returns:
    results (array): the array of preformatted matches
  */
  var results = [];
  for (var search_key in search_data){
    if (search_key.toLowerCase().indexOf(search_string) > -1) {
      results.push(search_data[search_key]["Result"]);
    };
  };
  return results;
};

function clear_table(table_id="result_table"){
  /*  Removes elements of table and returns the Element

  Args:
    table_id (string): the ID of the table to clear [default: "result_table"]

  Returns:
    table (HTML element): the cleared table
  */
  var table = document.getElementById(table_id);
  table.innerHTML = '';
  return table;
};

function build_table(search, results){
  /* Clears table and recreates with new rows containing results

  Args:
    search (string): the original search key, used for reordering results
    results (array): the list of formatted results

  Returns:
    None
  */
  var table = clear_table();
  var cells = [];

  // Reorder results to put exact match for 4-letter codes first
  for (var idx in results){
    if (results[idx].substring(0,4).toLowerCase() === search){
      var r = results[idx];
      results.splice(idx, 1); // Remove from current position
      results.unshift(r); // Add to beginning
      break; // No need to search through the rest when this has been found
    }
  }

  // Add a formatted table containing the results
  for (var idx in results){
    var row, cell;
    // Add cell and populate with text
    row = table.insertRow(idx);
    cell = row.insertCell(0);
    cell.innerHTML = results[idx];
    cell.className = "result_td";

    // Add stripe formatting
    cell.style.backgroundColor = (!!(idx&1)? "rgba(0,0,0,.05)" : "rgba(0,0,0,0)");
  };
};

async function search_and_display(user_input){
  /* Asynchronously display a table of results matching user input

  Args:
    user_input (string): the raw input

  Returns:
    None
  */
  // Lowercase search string
  var search_string = document.getElementById("input_box").value.toLowerCase();

  // Empty table when input box contains 0 or 1 characters
  if (search_string.length < 2){
    clear_table();
  } else {
    // Get search results asynchronously
    const response = await search(search_string);

    // Build table of results asynchronously
    await build_table(search_string, response);
  };
};

// Perform search when keyup is sensed
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("input_box").addEventListener("keyup", search_and_display);

});
