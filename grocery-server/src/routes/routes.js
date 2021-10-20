import { login, loginRequired, signUp } from "../controllers/userController";
import {
  addGrocery,
  deleteGrocery,
  getGroceries,
  getGroceryByID,
  updateGrocery,
} from "../controllers/groceryController";

export default function routes(app) {
  app.route("/").get((req, res) => {
    res.send("All Connected");
  });

  //TODO: Add Login Required For All Except Get Groceries
  app.route("/api/groceries").get(getGroceries).post(addGrocery);
  app
    .route("/api/groceries/:groceryID")
    .get(getGroceryByID)
    .put(updateGrocery)
    .delete(deleteGrocery);

  // Get Login Info?
  app.route("/api/signup").post(signUp);
  app.route("/api/login").post(login);
}
