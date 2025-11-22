import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage({ cards, setCards }) {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role) return alert("Please fill all required fields");

    const newCard = {
      id: Date.now(),
      photo: photo ? URL.createObjectURL(photo) : "https://via.placeholder.com/150",
      name,
      role,
      details,
    };

    setCards([...cards, newCard]);

    // Clear form
    setPhoto(null);
    setName("");
    setRole("");
    setDetails("");

    navigate("/cards");
  };

  return (
    <div className="form-container">
      <h2>Add New Card</h2>
      <form onSubmit={handleSubmit}>
        <label>Photo</label>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />

        <label>Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter role"
          required
        />

        <label>Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter other details"
        />

        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}

export default FormPage;
