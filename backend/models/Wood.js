import mongoose from "mongoose";

const woodSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Cabin", "Treehouse", "Cottage", "Lodge"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 500,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
    unit: {
      type: String,
      default: "per night",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wood = mongoose.model("Wood", woodSchema);

export default Wood;
