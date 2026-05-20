const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model("Faq", faqSchema);