import { useNavigate } from "react-router-dom";

function CardPage({ cards, setSelectedCard }) {
  const navigate = useNavigate();

  if (!cards.length) return <h3 className="no-card">No cards yet! Add some.</h3>;

  return (
    <div className="card-page">
      <h2>All Cards</h2>
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => {
              setSelectedCard(card);
              navigate("/details");
            }}
          >
            <img src={card.photo} alt={card.name} />
            <h3>{card.name}</h3>
            <p>{card.role}</p>
            {/* <p>{card.details.substring(0, 30)}...</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardPage;
