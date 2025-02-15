import { useState } from "react";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [logged, setLogged] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setLogged(data.rows);

      if (!response.ok) {
        setMessage(data.error);
        throw new Error(data.message);
      }
      setMessage("Login effettuato con successo");
    } catch (error) {
      setMessage(error.message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={user.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={user.password}
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
      {logged && (
        <div>
          <h2>Nome:{logged.name}</h2>
          <h2>Cognome:{logged.cognome}</h2>
          <h3>Data nascita:{logged.data_nascita}</h3>
        </div>
      )}
    </div>
  );
}
