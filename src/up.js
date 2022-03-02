import mongoose from "mongoose";
import csv from "csv-parser";
import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import Product from "./models/ProductTemp.js";
const __dirname = path.resolve();
const dataDirectory = `${__dirname}\\data`
import utf8 from "utf8"

const { ObjectId } = mongoose.Types;

// const parser = parse({
//   delimiter: ",",
// });

const catMap = {
  sanitary: "620a4a3b83fa1abb1cf09203",
};

const subCatMap = {
  faucet: "620b765c14f8812c61768e2a",
  "sanitary ware": "620b76ae14f8812c61768e2c",
  Basin: "620b76cc14f8812c61768e2e",
  Shower: "620b77e9b39915235c1645f9",
  Bathtub: "620b7823b39915235c1645fc",
  Steam: "620b7862b39915235c1645fe",
  Accessories: "620b7881b39915235c164600",
  Fittings: "620b78cfb39915235c164602",
  Furniture: "620b78f9b39915235c164604"
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
  "partition plate":"620b7ce8ccc0ee66cfd47fc7",
  "Seat covers":"620b7cf1ccc0ee66cfd47fc9",
  "flushing system":"620b7cfaccc0ee66cfd47fcb",
  "kitchen sink":"620b7d1accc0ee66cfd47fcd",
  "pedestals":"620b7d20ccc0ee66cfd47fcf",
  "wash basin":"620b7d25ccc0ee66cfd47fd1",
  "table basin":"620b7d31ccc0ee66cfd47fd3",
  // "overhead shower":"620b7d6fccc0ee66cfd47fd5",
  // "hand shower":"620b7d75ccc0ee66cfd47fd7",
  // "shower coupling":"620b7d7cccc0ee66cfd47fd9",
  // "shower arm":"620b7d82ccc0ee66cfd47fdb",
  // "shower enclosure":"620b7d8accc0ee66cfd47fdd",
  // "Shower tray":"620b7d90ccc0ee66cfd47fdf",
  // "Shower panel":"620b7d96ccc0ee66cfd47fe1",
  // "Body shower":"620b7d9cccc0ee66cfd47fe3",
  // "urinal accesories":"620b7f72a78a047a76be1c25",
  // "shower accessories":"620b7f7aa78a047a76be1c27",
  // "bath acessories":"620b7f7fa78a047a76be1c29",
  // "Mirror":"620b7f91a78a047a76be1c2b",
  // "washroom accessories":"620b7f95a78a047a76be1c2d",
  // "bathtub accessories":"620b7f9da78a047a76be1c2f",

};

const PROD_DB = "mongodb://kautilya:12345@cluster0-shard-00-00.lmhbo.mongodb.net:27017,cluster0-shard-00-01.lmhbo.mongodb.net:27017,cluster0-shard-00-02.lmhbo.mongodb.net:27017/Example?ssl=true&replicaSet=atlas-rf0qhg-shard-0&authSource=admin&retryWrites=true&w=majority"

const DEV_DB = "mongodb://localhost/plypicker"

mongoose.connect(PROD_DB, () => {
  console.log("Connected to MongoDB");
});

const results = [];

const parseData = async (data) => {
  if (!data.Category) return;
  if (!data.Product_Name) return;
  const productData = {
    Category: ObjectId(catMap[(data.Category).toString().trim()]),
    Sub_Category: ObjectId(subCatMap[(data.Sub_Category).toString().trim()]),
    Group: ObjectId(grpMap[(data.Groups).toString().trim()]),
    Brand: data.Brand,
    Model_no: data.Model_no,
    Product_Name: data.Product_Name,
    Product_Description: data.Product_Desc || "Good Product",
    Product_Price: convertCommaToNumber(data.Product_Price),
    Product_Image: data.Product_Image,
    Quantity: 100,
  };
  console.log(JSON.stringify(productData, null, 2));
  const product = new Product(productData);
  await product.save();
};

// csv - parser;
fs.createReadStream(dataDirectory + "/faucet.csv")
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


const convertCommaToNumber = (price) => {
  try {
    let utfString = utf8.decode(price.toString().trim())
    let num = parseFloat(utfString.replace(/,/g, ''))
    return num;
  }
  catch {
    return parseFloat(price.toString().trim().replace(/,/g, '').substring(1))
  }
}