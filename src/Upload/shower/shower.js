import mongoose from "mongoose";
import csv from "csv-parser";
import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { getAttributes } from "../../getAttributes.js";
import { getTags } from "../../getTags.js";
import { getVariants } from "../../getVariants.js";
import Product from "../../models/Product.js";
import { DEV_DB, PROD_DB } from "../../environment.js";
import utf8 from "utf8"
import { catMap, grpMap, subCatMap, subGrpMap } from "../../mappings.js";
const __dirname = path.resolve();

const DATA = __dirname + "/shower.csv"
// const parser = parse({
//   delimiter: ",",
// });
const { ObjectId } = mongoose.Types;


mongoose.connect(PROD_DB, () => {
  console.log("Connected to MongoDB");
});

const results = [];

const parseData = async (data) => {
  if (!data.product_category) return;
  if (!data.product_name) return;
  const productData = {
    model_no: data.model_no,
    category: ObjectId(catMap[(data.product_category).toString().trim()]),
    sub_category: ObjectId(subCatMap[(data.product_subcategory).toString().trim()]),
    group: ObjectId(grpMap[(data.product_group).toString().trim()]),
    sub_group: ObjectId(subGrpMap[(data.product_sub_group).toString().trim()]),
    brand: (data.brand),
    name: data.product_name,
    description: data.product_description,
    actual_price: removeRs(data.actual_price) || 0,
    discount_price: parseFloat(data.discount_price) || 0,
    attributes: getAttributes(data) || {},
    tags: getTags(data) || [],
    variants: getVariants(data),
  };
  console.log(JSON.stringify(productData, null, 2));
  const product = new Product(productData);
  // await product.save()
  try {
    await product.save();
  } catch (err) {
    console.log(JSON.stringify(productData, null, 2));
    console.log(err);
    process.exit()
  }
};


// csv - parser;
fs.createReadStream(DATA)
  .pipe(csv())
  .on("data", (data) => {
    parseData(data);
    // console.log(data)
    // console.log("\nbreak\n");
  })
  .on("error", (err) => {
    throw err
  })
  .on("end", () => {
    // console.log(results);
  });

const convertCommaToNumber = (price) => {
  try {
    let utfString = utf8.decode(price.toString().trim())
    utfString = utfString.trim()
    let num = parseFloat(utfString.replace(/,/g, ''))
    return num;
  }
  catch {
    return parseFloat(price.toString().trim().replace(/,/g, '').substring(1))
  }
}

const removeRs = (price) => {
  let ret = price.replace('Rs.', '')
  return convertCommaToNumber(ret)
}