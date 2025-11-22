import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import FormPage from "./FormPage";
import CardPage from "./CardPage";
import DetailPage from "./DetailPage";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<FormPage cards={cards} setCards={setCards} />}
        />
        <Route
          path="/cards"
          element={<CardPage cards={cards} setSelectedCard={setSelectedCard} />}
        />
        <Route
          path="/details"
          element={<DetailPage card={selectedCard} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
