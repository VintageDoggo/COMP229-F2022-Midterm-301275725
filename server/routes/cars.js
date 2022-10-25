/*
Student: Jorge Corichi Herrejon
File: index.ejs
Date: 25-10-2022
Web app: Favorite Cars
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const cars = require("../models/cars");

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   res.render("cars/add", {title: "Add a Car"});
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  //populating the model based on attributes in page
  let newCar = car({
    "Carname": req.body.carName,
    "Category": req.body.Category,
    "Carmodel": req.body.CarModel,
    "Price": req.body.Price
  })
  //Creating a new document and redirecting to list page
  car.create(newCar, (err,car)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect("/cars");
    }
  })
});


// GET - process the delete
router.get("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  //Create query to delete several documents
  //Condition is to delete if price is above 6000
  //Then redirect
  car.deleteMany({ "Price": { $gt: 6000 }}, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/cars');
    }
  });
  
});

// GET the Car Details page in order to edit an existing Car
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  //get id of the current object
  let id = req.params.id;

  //use id to fetch the document and pass it to the renderer
  car.findById(id, (err, carToUpdate) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.render("cars/details",{title: "Edit car", cars: carToUpdate} )
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  //fetch the data to update and assign to the object with the same id
  let editedCar = car({
    "_id": id,
    "Carname": req.body.Carname,
    "Category": req.body.Category,
    "Carmodel": req.body.Carmodel,
    "Price": req.body.Price
  })
  
  //update query
  //redirect to cars list
  car.updateOne({_id: id}, editedCar, (err) =>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/cars');
    }
  });
});



module.exports = router;
