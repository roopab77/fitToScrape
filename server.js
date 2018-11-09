// Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Require all models
var db = require("./models");

//var PORT = 3000;
var PORT = process.env.PORT || 3000;
// Initialize Express
var app = express();

// Configure middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
}
else
{
  // Connect to the Mongo DB
mongoose.connect("mongodb://localhost/fitToScrape", { useNewUrlParser: true });

}


//This route gets the categories of books from the website mentioned
app.get("/scrape/category/:number", function (req, res) {
  var resultarray = [];
  axios.get("https://www.goodreads.com/genres/list?page="+ req.params.number).then(function (response) {
    var $ = cheerio.load(response.data);   
    $(".shelfStat").each(function (i, element) {
     var result = {};
      result.category = $(element).children().find('.mediumText').text();
      //var link = $(element).children().find('.mediumText').attr('href');
      result.link =result.category;      
      resultarray.push(result);     
    });   
    //console.log(resultarray);
    db.Category.create(resultarray)
  .then(function (dbCategories) {
    //console.log(dbCategories);
    res.json(dbCategories);
  })
  .catch(function (err) {
    return res.json(err);
  })
  //res.json(resultarray);

  });
  
  
 
});

// A GET route for scraping the echoJS website
app.get("/scrape/book", function (req, res) {

  axios.get("https://www.goodreads.com/shelf/show/40k").then(function (response) {
    var $ = cheerio.load(response.data);
    $(".Updates .firstcol").each(function (i, element) {
      var result = {};
      result.title = $(element).children().attr("title");
      result.link = $(element).children().children().attr("src");
      console.log(result);
      db.Books.create(result)
        .then(function (dbBooks) {
          console.log(dbBooks);
        })
        .catch(function (err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
});

//This route pulls all the books for the specific category and save them in the books collection
app.get("/scrape/book/:link", function (req, res) {
  var category_id = req.params.link.split(":")[0];
  var link =  "https://www.goodreads.com/shelf/show/" +   req.params.link.split(":")[1];
  console.log("Link   " + link);
  console.log("category id   " + category_id);

  axios.get(link).then(function (response) {
    var $ = cheerio.load(response.data);
    var resultarray = [];
    $(".elementList .left").each(function (i, element) {
      var result = {};
      result.title = $(element).children().attr("title");
      result.link = $(element).children().children().attr("src"); 
      //result.categoryid = category_id;    
      resultarray.push(result);
    });
    // { $push: { scores: { $each: [ 90, 92, 85 ] } } }

    db.Books.create(resultarray)
      .then(function(dbBook) {    
        const bookIds = dbBook.map(book => book._id); 
          
        return db.Category.findByIdAndUpdate(category_id ,  { $push: { books: { $each:bookIds } } });
      })
      .then(function(dbCategory) {
        // If the User was updated successfully, send it back to the client
        res.json(dbCategory);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        console.log(err);
        res.json(err);
      });
   res.json(resultarray);
  });
});

//This route reads all the categories from the Category collection and returns it 
app.get("/categories", function(req,res){
  db.Category.find()
  .then(function(dbCategories){
    res.json(dbCategories);
  })
  .catch(function(err){
    res.json(err);
  });
});

//This route reads all the books for a particular category collection
app.get("/books/:categoryid",function(req,res){
  db.Category.findById(req.params.categoryid)
  .populate("books")
  .then(function(dbCategories){    
    res.json(dbCategories);
  })
  .catch(function(err){
    res.json(err);
  });
});
// Listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port" + PORT);
});
