/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export function DashBoard({ loggedInfo }) {
  const [modify, setModify] = useState(false);
  const [newUser, setNewUser] = useState({
    nome: loggedInfo.nome,
    cognome: loggedInfo.cognome,
    dataNascita: loggedInfo.data_nascita,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(newUser);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewUser((newUser) => ({ ...newUser, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/users/${loggedInfo.id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      console.log("info change request sent");
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error);
        throw new Error(data.message);
      }
      setMessage(data.message);
      setTimeout(() => {
        setModify(false);
      }, 2000);
    } catch (error) {
      console.error("Error in fetching user data:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {loggedInfo && (
          <div>
            <h3>Nome utente: {loggedInfo.nome}</h3>
            <h3>Cognome utente: {loggedInfo.cognome}</h3>
            <h3>Email utente: {loggedInfo.email}</h3>
            <h3>Data nascita utente: {loggedInfo.data_nascita}</h3>
            <button onClick={() => setModify(true)}>Change info</button>
          </div>
        )}
        {modify ? (
          <div>
            <label htmlFor="change-name">Nome: </label>
            <input
              type="text"
              name="nome"
              id="nome"
              onChange={handleChange}
              value={newUser.nome}
              required
            />
            <label htmlFor="change-last-name">Cognome: </label>
            <input
              type="text"
              name="cognome"
              id="cognome"
              onChange={handleChange}
              value={newUser.cognome}
              required
            />
            <label htmlFor="change-birth-date">Data Nascita: </label>
            <input
              type="date"
              name="dataNascita"
              id="dataNascita"
              onChange={handleChange}
              value={newUser.dataNascita}
              required
            />
            <button type="submit">Save</button>
            <button
              onClick={() => {
                setModify(false);
              }}
            >
              Cancel
            </button>
            {message && <p>{message}</p>}
          </div>
        ) : (
          <div></div>
        )}
      </form>
    </>
  );
}
