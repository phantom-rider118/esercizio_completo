import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.img ? user.img : "https://placehold.co/40"} />
          <h3>{user.nome}</h3>
          <h3>{user.cognome}</h3>
          <h4>{user.data_nascita}</h4>
          <h4>{user.email}</h4>
          <hr />
        </div>
      ))}
    </>
  );
}

export default App;
