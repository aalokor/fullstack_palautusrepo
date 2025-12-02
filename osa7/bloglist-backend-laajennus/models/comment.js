const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
