import { useState } from "react";

export function Registrazione() {
  const [data, setData] = useState({
    name: "",
    cognome: "",
    dataNascita: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        setMessage(`Registrazione fallita : ${error}`);
      }
      const data = await response.json();
      setMessage("Registrazione effettuata con successo");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          id="nome"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cognome"
          id="cognome"
          value={data.cognome}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dataNascita"
          id="dataNascita"
          value={data.dataNascita}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          id="passsword"
          onChange={handleChange}
        />
        <button type="submit">Invia</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
