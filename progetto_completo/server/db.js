import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./Database.db");

db.exec(
  `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    data_nascita DATE NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    img BLOB
    )  
    `,
  (err) => {
    if (err) {
      console.error("errore creazione tabella");
    }
  }
);

export default db;
