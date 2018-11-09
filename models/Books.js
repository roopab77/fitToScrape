var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BookSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});
var Books = mongoose.model("Books", BookSchema);
module.exports = Books;
