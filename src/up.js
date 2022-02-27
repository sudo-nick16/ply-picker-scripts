import mongoose from "mongoose";
import csv from "csv-parser";
import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import Product from "./models/ProductTemp.js";
const __dirname = path.resolve();

const { ObjectId } = mongoose.Types;

// const parser = parse({
//   delimiter: ",",
// });

const catMap = {
  sanitary: "620a4a3b83fa1abb1cf09203",
};

const subCatMap = {
  faucet: "620b765c14f8812c61768e2a",
};

const grpMap = {
  "foot operated faucet": "620b7c64ccc0ee66cfd47fb1",
  "single lever faucet": "620b7c70ccc0ee66cfd47fb3",
  "half turn fauce": "620b7c8bccc0ee66cfd47fb7",
  "quarter turn faucet": "620b7c80ccc0ee66cfd47fb5",
  "sensor & touch faucets": "620b7c91ccc0ee66cfd47fb9",
  "push taps": "620b7c9bccc0ee66cfd47fbb",
  "swan neck": "620b7c9fccc0ee66cfd47fbd",
  "bathtub faucet": "620b7ca5ccc0ee66cfd47fbf",
  comboard: "620b7ccfccc0ee66cfd47fc1",
  urinal: "620b7cd5ccc0ee66cfd47fc3",
  "hand jet spray": "620b7ce0ccc0ee66cfd47fc5",
};

mongoose.connect("mongodb://localhost/plypicker", () => {
  console.log("Connected to MongoDB");
});

const results = [];

const parseData = async (data) => {
  if(!data.Category) return;
  const productData = {
    Category: ObjectId(catMap[data.Category]),
    Sub_Category: ObjectId(subCatMap[data.Sub_Category]),
    Group: ObjectId(grpMap[data.Groups]),
    Brand: data.Brand,
    Model_no: data.Model_no,
    Product_Name: data.Product_Name,
    Product_Description: data.Product_Desc || "Good Product",
    Product_Price: parseFloat(data.Product_Price),
    Product_Image: data.Product_Image,
    Quantity: 100,
  };
  console.log(JSON.stringify(productData, null, 2));
  const product = new Product(productData);
  await product.save();
};

// csv - parser;
fs.createReadStream(__dirname + "/src/data.csv")
  .pipe(csv())
  .on("data", (data) => {
    parseData(data);
    // console.log("\nbreak\n");
  })
  .on("error", (err) => {
    throw err;
  })
  .on("end", () => {
    // console.log(results);
  });
