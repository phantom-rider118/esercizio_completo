import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./Database.db");

db.exec(
  `CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   nome VARCHAR(50) NOT NULL,
   cognome VARCHAR(50) NOT NULL,
   email TEXT UNIQUE NOT NULL, 
   password TEXT NOT NULL,
   data_nascita DATE NOT NULL,
   img BLOB
)`,
  (err) => {
    if (err) {
      console.error("Tabella gia creata o esistente", err.message);
    } else {
      console.log(`Tabella creata correttamente`);
    }
  }
);

export default db;
