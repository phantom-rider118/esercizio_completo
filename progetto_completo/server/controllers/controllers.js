import db from "../db.js";

export const getAllUsers = (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
};

export const registrazione = (req, res) => {
  const { nome, cognome, dataNascita, email, password } = req.body;
  db.run(
    `INSERT INTO users (nome, cognome, data_nascita, email, password) VALUES (?,?,?,?,?)`,
    [nome, cognome, dataNascita, email, password],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).send("Email già registrata");
        }
        res.status(500).send("Errore nella registrazione");
      }
      res
        .status(201)
        .json({ id: this.lastID, nome, cognome, dataNascita, email, password });
    }
  );
};
