/* eslint-disable no-undef */
import db from "../db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

export const getAllUsers = (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
};

export const registrazione = async (req, res) => {
  const { nome, cognome, dataNascita, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    db.get(`SELECT * FROM users WHERE email= ?`, [email], function (err, row) {
      if (err) {
        return res.status(500).send("Errore nella registrazione");
      }
      if (row) {
        return res.status(400).json({ message: "Email già registrata" });
      }

      db.run(
        `INSERT INTO users (nome, cognome, data_nascita, email, password) VALUES (?,?,?,?,?)`,
        [nome, cognome, dataNascita, email, hashedPassword],
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
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "errore nella registrazione", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE email=?`,
    [email],
    async function (err, rows) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!rows) {
        return res.status(400).json({ message: "credenziali non valide" });
      }
      const passwordMetch = await bcrypt.compare(password, rows.password);
      if (!passwordMetch) {
        return res.status(401).json({ message: "credenziali errate" });
      }
      return res.json({
        message: "login effettutato con successo",
        id: id.rows,
      });
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
