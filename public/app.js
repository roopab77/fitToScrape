// Grab the articles as a json

$("#getcategories").on("click", function () {
  $.get("/scrape/category/1", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $("#categories").append("<p data-id='" + data[i]._id + "'>" + data[i].category + " - " + data[i]._id + "</p>");
      
      var url = "/scrape/book/" +  data[i]._id + ":" + data[i].category;

      $.get(url, function (data) {
        console.log(data);
      });

    }
  });
  $.get("/scrape/category/2", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $("#categories").append("<p data-id='" + data[i]._id + "'>" + data[i].category + " - " + data[i]._id + "</p>");
      
      var url = "/scrape/book/" +  data[i]._id + ":" + data[i].category;

      $.get(url, function (data) {
        console.log(data);
      });

    }
  });
  $.get("/scrape/category/3", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $("#categories").append("<p data-id='" + data[i]._id + "'>" + data[i].category + " - " + data[i]._id + "</p>");
      
      var url = "/scrape/book/" +  data[i]._id + ":" + data[i].category;

      $.get(url, function (data) {
        console.log(data);
      });

    }
  });
  $.get("/scrape/category/4", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $("#categories").append("<p data-id='" + data[i]._id + "'>" + data[i].category + " - " + data[i]._id + "</p>");
      
      var url = "/scrape/book/" +  data[i]._id + ":" + data[i].category;

      $.get(url, function (data) {
        console.log(data);
      });

    }
  });
  $.get("/scrape/category/5", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $("#categories").append("<p data-id='" + data[i]._id + "'>" + data[i].category + " - " + data[i]._id + "</p>");
      
      var url = "/scrape/book/" +  data[i]._id + ":" + data[i].category;

      $.get(url, function (data) {
        console.log(data);
      });

    }
  });
});

$(document).on("click", ".createbooks", function () {

  var url = "/scrape/book/" + $(this).attr("value") + ":" + $(this).text();

  $.get(url, function (data) {
    console.log(data);

  });
});



