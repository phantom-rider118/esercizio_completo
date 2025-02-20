/* eslint-disable no-undef */
import db from "./db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

db.all(`SELECT id, password FROM users`, async (err, rows) => { //se non inserisco qui l'id non puo andarlo a recuperare
  if (err) {
    console.error(err.message);
  }
  for (const element of rows) {
    const {id, password} = element
    if (password.startsWith("$2b$")) {
      continue;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      db.run(
        `UPDATE users SET password=? WHERE id=?`,
        [hashedPassword, id],
        function (err) {
          if(err){
           return console.error(err.message);
          }
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  }
});
