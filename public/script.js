
//On page load this route will load all the categories from the db
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

//When a category is clicked this function would bring all the books related to the category
$(document).on("click", ".category-to-review", function () {
  //alert($(this).attr("value"));
  $("#getCategories").attr("style","display:block");
  $("#categories").attr("style", "display:none");
  $("#sub-title").text("Click on the book to add your comments/Notes");
  var catId = $(this).attr("value");
  $.get("/books/" + catId, function (data) {
    console.log(data.books);
    data.books.forEach(book => {
      var divTag = `<div class="col-md-2 book"data-toggle="modal" data-target="#exampleModal" data-whatever="${book.title}:${book._id}" ><div class="card-counter1" >
      <img  src="${book.link}" alt="Card image cap">      
        <div class="card-title">${book.title}</div>           
     </div></div>`
      $("#books").append(divTag);
    });
  });

});

//When clicked on the book show a modal to add comments and notes to save
$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var bookDetails = button.data('whatever').split(":");  
  var recipient = bookDetails[0]; // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find(".save-comments").val(bookDetails[1])
  modal.find('.modal-title').text('Add Comments/Notes for ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

//when clicked on the save save the notes and comments in the db
$(document).on("click", ".save-comments", function(){

  var bookid = $(this).attr('value');
  var commentsModal = $("#commentsFromModal").val();
  var notesModal =$("#notesFromModal").val();
  console.log(commentsModal,notesModal);
  
  $.post("/notes/"+ bookid,{comments:commentsModal , notes:notesModal},function(data){
    //console.log(data);
    $('#exampleModal').modal('hide');
  });

  
});

//get categories from the db when clicked the back button from categories
$("#getCategories").on("click",function(){
  location.reload();
});


