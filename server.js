import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { MongoClient } from "mongodb";
import { router } from "./API/Routes/routes.js";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT_NUMBER;
mongoose
  .connect(
    "mongodb+srv://m001-student:lobkWOxiBTT49XcE@cluster0.ex430.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.use("/users", router);

    app.listen(port, () => {
      console.log(`server is running on port:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
