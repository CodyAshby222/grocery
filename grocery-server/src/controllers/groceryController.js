import mongoose from "mongoose";
import { GrocerySchema } from "../models/grocery";

const Grocery = mongoose.model("Grocery", GrocerySchema);

export const getGroceries = (req, res) => {
  Grocery.find({}, (err, grocery) => {
    if (err) res.send(err);
    res.json(grocery);
  });
};

export const getGroceryByID = (req, res) => {
  Grocery.findById(req.params.groceryID, (err, grocery) => {
    if (err) res.send(err);
    res.json(grocery);
  });
};

export const addGrocery = (req, res) => {
  let newGrocery = new Grocery(req.body);
  newGrocery.save((err, grocery) => {
    if (err) res.send(err);
    res.json(grocery);
  });
};

export const updateGrocery = (req, res) => {
  Grocery.findOneAndUpdate(
    { _id: req.params.groceryID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, grocery) => {
      if (err) res.send(err);
      res.json(grocery);
    }
  );
};

export const deleteGrocery = (req, res) => {
  Grocery.deleteOne({ _id: req.params.groceryID }, (err, grocery) => {
    if (err) res.send(err);
    res.json({ message: "Grocery deleted." });
  });
};
