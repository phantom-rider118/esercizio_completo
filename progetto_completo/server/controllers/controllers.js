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

  db.get(`SELECT * FROM users WHERE email= ?`, [email], function (err, rows) {
    if (err) {
      return res.status(500).send("Errore nella registrazione");
    }
    if (rows) {
      return res.status(400).json({ message: "Email già registrata" });
    }
    db.run(
      `INSERT INTO users (nome, cognome, data_nascita, email, password) VALUES (?,?,?,?,?)`,
      [nome, cognome, dataNascita, email, password],
      function (err) {
        if (err) {
          return res.status(500).send("Errore nella registrazione");
        }
        return res.status(201).json({
          id: this.lastID,
          nome,
          cognome,
          dataNascita,
          email,
          password,
        });
      }
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ? AND password= ?`,
    [email, password],
    function (err, rows) {
      if (err) {
        return req.status(500).json({ message: err.message });
      }
      if (!rows) {
        return res.status(400).json({ message: "Credenziali non valide" });
      }
      return res.status(201).json({message: "Login effettuato con successo", rows});
    }
  );
};
