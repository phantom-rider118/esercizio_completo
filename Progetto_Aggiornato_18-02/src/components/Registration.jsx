import { useState } from "react";

export function RegistrationForm() {
  const [data, setData] = useState({
    nome: "",
    cognome: "",
    dataNascita: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (error) {
        throw new Error(error.message);
      }

      if (!response.ok) {
        throw new Error(
          responseData.message || "Errore durante la registrazione."
        );
      }

      setMessage("Registrazione effettuata con successo");
      setData({
        nome: "",
        cognome: "",
        dataNascita: "",
        email: "",
        password: "",
      }); // Reset campi
    } catch (error) {
      setMessage(`Registrazione fallita: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          id="nome"
          onChange={handleChange}
          value={data.nome}
          required
        />

        <label htmlFor="cognome">Cognome:</label>
        <input
          type="text"
          name="cognome"
          id="cognome"
          onChange={handleChange}
          value={data.cognome}
          required
        />

        <label htmlFor="dataNascita">Data di nascita:</label>
        <input
          type="date"
          name="dataNascita"
          id="dataNascita"
          onChange={handleChange}
          value={data.dataNascita}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={data.email}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={data.password}
          required
          minLength={6}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Invio..." : "Invia"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}
