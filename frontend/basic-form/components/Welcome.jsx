import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Could not reach the server"));
  }, []);

  return (
    <div>
      <h1>{message || "Loading..."}</h1>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/users">View All Users</Link>
      </nav>
    </div>
  );
}

export default Welcome;