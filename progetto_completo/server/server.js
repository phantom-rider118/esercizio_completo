import express, { json } from "express";
import cors from "cors";
// import multer from "multer";

import { getAllUsers, registrazione } from "./controllers/controllers.js";

const app = express();
const PORT = 5000;

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server attivo");
});

app.get("/users", getAllUsers);
app.post("/users", registrazione);

app.listen(PORT, () => {
  console.log(`server in ascolto su http://localhost:${PORT}`);
});
