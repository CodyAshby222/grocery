import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GrocerySchema = new Schema({
  user_id: {
    type: String,
    required: "Use ID of User",
  },
  name: {
    type: String,
    required: "Enter Name Of Grocery",
  },
  image: {
    type: String,
  },
  notes: {
    type: String,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});
