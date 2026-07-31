import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data)) // matches your { status, message, data } response shape
      .catch(() => setError("Could not load users"));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.reg_id}>
            {user.fullname} — {user.email} — Reg: {user.reg_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;