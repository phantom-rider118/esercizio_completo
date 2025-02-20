import { useEffect, useState } from "react";
import "./App.css";
import { RegistrationForm } from "./components/Registration";
import { Login } from "./components/Login";

function App() {
  const [users, setUsers] = useState([]);
  const PORT = import.meta.env.PORT

  async function fetchUsers() {
    try {
      const response = await fetch(`http://localhost:${PORT}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <ul>
        {" "}
        {users.map((element) => (
          <li key={element.id}>
            <p>
              Nome: <span>{element.nome}</span>- Cognome:
              <span>{element.cognome}</span>- Email:{" "}
              <span>{element.email}</span>- Avatar:
              <img
                src={element.img ? element.img : "https://placehold.co/50"}
              />
            </p>
          </li>
        ))}
      </ul>
      <RegistrationForm />
      <Login />
    </>
  );
}

export default App;
