const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Buffer,
      trim: true,
    },
    imageType: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: { type: String, trim: true },
        type: { type: String, trim: true },
        featureName: { type: String, trim: true },
        featureValue: { type: String, trim: true },
        colorHex: { type: String, trim: true },
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    offer: {
      type: String,
      trim: true,
    },
    features: [
      {
        name: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
