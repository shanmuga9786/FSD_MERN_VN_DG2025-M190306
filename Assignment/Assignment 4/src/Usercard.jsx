import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Usercard.css";

function UserCard() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const nextUser = () => {
    setIndex((prev) => (prev + 1) % users.length);
  };

  if (users.length === 0) return <p className="loading">Loading card...</p>;

  const user = users[index];

  return (
    <div className="out">
    <div className="card">
      <img
        src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
        alt="profile"
        className="avatar"
      />

      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>City:</strong> {user.address.city}</p>

      <button className="btn" onClick={nextUser}>Next User</button>
    </div>
  </div>
  );
}

export default UserCard;