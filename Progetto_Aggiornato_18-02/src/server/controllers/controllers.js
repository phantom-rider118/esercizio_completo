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

  db.all(`SELECT * FROM users WHERE email= ?`, [email], function (err, rows) {
    if (err) {
      return res.status(500).send("Errore nella registrazione");
    }
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email già registrata" });
    }
    db.run(
      `INSERT INTO users (nome, cognome, data_nascita, email, password) VALUES (?,?,?,?,?)`,
      [nome, cognome, dataNascita, email, password],
      function (err) {
        if (err) {
          // if (err.message.includes("UNIQUE constraint failed")) {
          //   return res.status(400).send("Email già registrata");
          // }
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
    `SELECT * FROM users WHERE email=? AND password=?`,
    [email, password],
    function (err, rows) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!rows) {
        return res.status(400).json({ message: "credenziali non valide" });
      }
      return res.json({ message: "login effettutato con successo", rows });
    }
  );
};

export const updateInfo = (req, res) => {
  const { id } = req.params;
  const { nome, cognome, dataNascita } = req.body;

  db.run(
    `UPDATE  users  SET nome=?, cognome=?, data_nascita=? WHERE id=?`,
    [nome, cognome, dataNascita, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res.json({ message: "Informazioni modificate correttamente" });
    }
  );
};
