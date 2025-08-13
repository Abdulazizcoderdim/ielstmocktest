const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length === 4;
        },
        message: "Exactly 4 options are required",
      },
      required: true,
    },
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
