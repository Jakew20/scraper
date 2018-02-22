// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    
    .done(function(data) {
      console.log(data);
      
      $("#notes").append("<h2>" + data.title + "</h2>");
      
      $("#notes").append("<input id='titleinput' name='title' >");
     
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

     
      if (data.note) {
      
        $("#titleinput").val(data.note.title);
       
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");

 
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
     
      title: $("#titleinput").val(),
      
      body: $("#bodyinput").val()
    }
  })
   
    .done(function(data) {
      
      console.log(data);
     
      $("#notes").empty();
    });

 
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
