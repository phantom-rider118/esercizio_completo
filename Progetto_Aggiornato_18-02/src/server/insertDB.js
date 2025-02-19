import db from "./db.js";

db.exec(
  `INSERT INTO users (nome,cognome,data_nascita,email,password)
    VALUES("Marco","Grassi", "10/11/2000", "marco.grassi@gmail.com","321Passwors"),
    ("Mattia","Grosso", "22/10/2010", "mattia.grosso@gmail.com","321Passwors"),
    ("Franco","Rossi", "03/05/2001", "franco.rossi@gmail.com","321Passwors"),
    ("Luca","Verdi", "12/08/1998", "luca.verdi@gmail.com","321Passwors")
    
    
    
    
    `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);
