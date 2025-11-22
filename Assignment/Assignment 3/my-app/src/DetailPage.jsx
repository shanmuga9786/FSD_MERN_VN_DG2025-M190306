import { useNavigate } from "react-router-dom";

function DetailPage({ card }) {
  const navigate = useNavigate();

  if (!card) return <h3 className="no-card">No card selected!</h3>;

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="img-h2">
            <img src={card.photo} alt={card.name} className="detail-img" />
            <div className="role">
              <h2>{card.name}</h2>
              <h4>Character Role :{card.role}</h4>
            </div>
        </div>
      <p className="details"> <h1>Details</h1> <br /> {card.details}</p>
    </div>
  );
}

export default DetailPage;
