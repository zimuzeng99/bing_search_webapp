document.getElementById("searchButton").addEventListener("click", performSearch);

function performSearch(e) {
  // Clear previous search results
  var flashcardContainer = document.getElementById("flashcardContainer");
  flashcardContainer.innerHTML = "";

  var searchTerm = document.getElementById("searchBar").value;
  if (searchTerm) {
    var xhr = new XMLHttpRequest();

    // Adds one new flashcard to the page for each search result
    xhr.addEventListener("load", function(e) {
      var response = JSON.parse(xhr.responseText);
      for (var i = 0; i < response.length; i++) {
        var newFlashcard = createFlashcard(response[i].name, response[i].description, response[i].url);
        flashcardContainer.appendChild(newFlashcard);
      }
    });

    // Send the request to the Flask API in order to retrieve search results
    var url = "http://localhost:5000/api/search";
    var params = "search_term=" + searchTerm;
    xhr.open("GET", url + "?" + params);
    xhr.send();
  }
}

// Create the HTML element for a flashcard from the given parameters.
// Each flashcard represents one search result.
function createFlashcard(name, description, url) {
  newDiv = document.createElement("div");
  newDiv.className = "col-sm-6 col-lg-4 mb-4";

  newDiv.innerHTML = `
            <div class="blog-entry">
              <div class="blog-entry-text">
                <h3><a href="${url}">${name}</a></h3>
                <p class="mb-4">${description}</p>
              </div>`;

  return newDiv;
}
