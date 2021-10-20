import express from "express";
import routes from "./src/routes/routes";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import cors from "cors";

const app = express();
const PORT = 8080;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "ILoveGroceries",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server Running - PORT ${PORT}`);
});
