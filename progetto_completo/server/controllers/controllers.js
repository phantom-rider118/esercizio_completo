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
  const { name, cognome, dataNascita, email, password } = req.body;
  db.run(
    `INSERT INTO users(nome, cognome, data_nascita, email, password) VALUES(?,?,?,?,?)`,
    [name, cognome, dataNascita, email, password],
    function (err) {
      if (err) {
        res.status(500).send(`errore nella registrazione`);
      }
      res
        .status(201)
        .json({ id: this.lastID, name, cognome, dataNascita, email, password });
    }
  );
};
