import "babel-polyfill";
import express from "express";
import cors from "cors";
import { PORT } from "./util/constants";
import {
  getDirStructureController,
  getDirStructureWithPathController,
} from "./controllers/dirController";

const app = express();

// Register middlewars
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.get("/getDirStructure", getDirStructureController);
app.get("/getDirStructure/*", getDirStructureWithPathController);

app.listen(PORT, () => {
  console.log("running on port: " + PORT);
});
