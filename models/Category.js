var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
  category: { 
    type: String,
    required: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: "Books"
  }]
});
var Category = mongoose.model("Category", CategorySchema);
module.exports = Category;