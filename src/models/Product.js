import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProductSchema = new Schema({
  model_no: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    required: true,
  },
  sub_category: {
    type: ObjectId,
    required: true,
  },
  group:{
    type: ObjectId,
    required: true,
  },
  sub_group: {
    type: ObjectId,
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
  },
  actual_price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
    required: true,
  },
  // ratings_and_reviews: {
  //   ratings: {
  //     type: Number,
  //   },
  //   reviews: {
  //     type: Array
  //   }
  // },
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
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
