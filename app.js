import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 4040;
const dbUri = process.env.DBURI;

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(port, () => {
      console.log(`This app is running on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  ress.send("Hello fabrikers! this is th bibliotech managment system app");
});
