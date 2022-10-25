/*<!-----
Student: Jorge Corichi Herrejon
File: index.ejs
Date: 25-10-2022
Web app: Favorite Cars
------>*/

let mongoose = require("mongoose");

// create a model class
let Car = mongoose.Schema(
  {
    Carname: String,
    Category: String,
    Carmodel: String,
    Price: Number,
  },
  {
    collection: "cars",
  }
);

module.exports = mongoose.model("Car", Car);
