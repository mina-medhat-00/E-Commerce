const fs = require("fs");
const dotenv = require("dotenv");
const Product = require("../../models/productModel");
const dbConnection = require("../../config/database");
require("colors");

dotenv.config({ path: "../../config.env" });

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync("./products.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// run the script: node seeder.js -d or node seeder.js -i
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
