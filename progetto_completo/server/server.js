import express, { json } from "express";
import cors from "cors";
// import multer from "multer";
import {
  getAllUsers,
  login,
  registrazione,
} from "./controllers/controllers.js";

const app = express();
const PORT = 5000;

//middleware
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("server startato");
});

app.get("/users", getAllUsers);
app.post("/users", registrazione);
app.post("/login", login);

app.listen(PORT, () => {
  console.log(`server in ascolto su http://localhost:${PORT}`);
});
