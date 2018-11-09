$.get("/categories", function (data) {
  console.log(data);

  data.forEach(category => {

    var divTag = `<div class="col-md-3">
    <div class="card-counter info category-to-review" value=${category._id}>
     
      <span class="count-numbers" >${category.category}</span>
      
    </div>
    </div>`
    $("#categories").append(divTag);
  });

});

$(document).on("click", ".category-to-review", function () {
  //alert($(this).attr("value"));
  $("#categories").attr("style","display:none");
  $("#sub-title").text("Click on the book to add your comments/Notes");
  var catId = $(this).attr("value");
  $.get("/books/" + catId, function (data) {
    console.log(data.books);
    data.books .forEach(book => {
      var divTag = `<div class="col-md-2 book"><div class="card-counter1" >
      <img  src="${book.link}" alt="Card image cap">
      <div>
        <span class="card-title">${book.title}</span>               
      </div>
    </div></div>`
      $("#books").append(divTag);
    });
  });

});

$(document).on("click",".book",function(){

  
});
