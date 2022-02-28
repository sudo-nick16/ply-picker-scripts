import mongoose from "mongoose";
import csv from "csv-parser";
import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { getAttributes } from "./getAttributes.js";
import { getTags } from "./getTags.js";
import { getVariants } from "./getVariants.js";
import Product from "./models/Product.js";
const __dirname = path.resolve();

// const parser = parse({
//   delimiter: ",",
// });

mongoose.connect("mongodb://localhost/products", () => {
  console.log("Connected to MongoDB");
});

const results = [];

const parseData = async (data) => {
  const productData = {
    model_no: data.model_no,
    category: data.product_category,
    sub_category: data.product_subcategory,
    group: data.product_group,
    sub_group: data.product_sub_group,
    brand: data.brand,
    name: data.product_name,
    description: data.product_description,
    actual_price: parseFloat(data.actual_price) || 0,
    discount_price: parseFloat(data.discount_price) || 0,
    attributes: getAttributes(data) || {},
    tags: getTags(data) || [],
    variants: getVariants(data),
  };
  console.log(JSON.stringify(productData, null, 2));
  const product = new Product(productData);
  try {
    await product.save();
  } catch (err) {
    console.log(err);
  }
};

// csv - parser;
fs.createReadStream(__dirname + "/sample.csv")
  .pipe(csv())
  .on("data", (data) => {
    parseData(data);
    // console.log("\nbreak\n");
  })
  .on("end", () => {
    // console.log(results);
  });
