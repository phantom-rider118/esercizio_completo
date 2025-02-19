import { useState } from "react";
import { DashBoard } from "./DashBoard";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    console.log("submit request");

    event.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);

      setLogged(data.rows);
      if (!response.ok) {
        setMessage(data.error);
        throw new Error(data.message);
      }
      setMessage("login effettutato con successo!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login_email">email: </label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <label htmlFor="login_password">password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
        {message && <p>{message}</p>}
      </form>
      {logged && <DashBoard loggedInfo={logged} />}
    </div>
  );
}
