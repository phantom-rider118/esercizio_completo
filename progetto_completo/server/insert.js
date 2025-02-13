import db from "./db.js";

db.exec(
  `INSERT INTO users (nome, cognome, data_nascita, email, password)
    VALUES ("Marco", "Rossi", "10/11/1995", "marco@gmail.com", "123Pass"),
    ("Michele", "Bianchi", "21/01/1990", "michy@gmail.com", "123Pass"),
    ("Laura", "Verdi", "16/06/1993", "laura@gmail.com", "123Pass")
    `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);
