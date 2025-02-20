/* eslint-disable no-undef */
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import multer from "multer";
import {
  getAllUsers,
  registrazione,
  login,
  updateInfo,
} from "./controllers/controllers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("server startato");
});

app.get("/users", getAllUsers);
app.post("/users", registrazione);
app.post("/login", login);
app.put("/users/:id", updateInfo);

app.listen(PORT, () => {
  console.log(`server attivo su http://localhost:${PORT}`);
});
