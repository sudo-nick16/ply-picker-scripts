import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  model_no: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  group:{
    type: String,
    required: true,
  },
  sub_group: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actual_price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
    required: true,
  },
  //   ratings_and_reviews: {
  //     type: Array,
  //     required: true,
  //   },
  attributes: {
    type: Object,
  },
  tags: {
    type: Array,
    default: [],
    required: true,
  },
  variants: {
    type: Array,
    default: [],
    required: true,
  },
});

// const Product = mongoose.model("Product", ProductSchema);

// export default Product;
