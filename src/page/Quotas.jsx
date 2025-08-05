import { useState, useEffect} from 'react'
import Header from '../components/Header';
import './Quotas.scss'

const Quotas = () => {  
    const [ventes, setVentes] = useState([])
    const [resetMessage, setResetMessage] = useState("")
    const [password, setPassword] = useState("")

const handleReset = async () => {
  const userPassword = prompt("Entrez le mot de passe pour réinitialiser les ventes :");
  if (!userPassword) return;

  try {
    const res = await fetch("https://flask-render-production.up.railway.app/api/ventes/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: userPassword }),
    });

    if (res.ok) {
      setResetMessage("✅ Ventes réinitialisées avec succès.");
      setVentes({}); // Vide l'affichage
    } else {
      const err = await res.json();
      setResetMessage("❌ Erreur : " + (err.erreur || "Échec de la réinitialisation"));
    }
  } catch (error) {
    setResetMessage("❌ Erreur réseau.");
    console.error("Erreur reset :", error);
  }
};

    useEffect(() => {
        fetch("https://flask-render-production.up.railway.app/api/ventes")
        .then((res) => res.json())
        .then((data) => {
        
        const resume = {};
        data.forEach(({vendeur, item, quantite}) => {
            if (item.toLowerCase() === "pizza") {
                if (!resume[vendeur]){
                    resume[vendeur] = 0;
                }
                resume[vendeur] += quantite;
            }
        });
        setVentes(resume);
    })
    .catch((err) => console.error("Error lors du fetch", err));
    },[]);

     const calculerPrime = (quantite) => {
    if (quantite >= 10000) return "90 000 $";
    if (quantite >= 8000) return "80 000 $";
    if (quantite >= 6000) return "70 000 $";
    if (quantite >= 4500) return "60 000 $";
    if (quantite >= 4000) return "50 000 $";
    return "-";
  };

    return (
        <>
        <Header/>
          <div className="p-4">
      <h1 className="compta">Comptabilité Runner</h1>
      <div style={{ marginBottom: "20px"}} className='reset'>
      <button onClick={handleReset}>🔁 Reset</button>
      {resetMessage && <p>{resetMessage}</p>}
      </div>
      <table className="tableau">
        <thead>
          <tr>
            <th className="runner">Runner</th>
            <th className="pizzas">Pizzas vendues</th>
            <th className="prime">Prime</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ventes).map(([vendeur, quantite]) => (
            <tr key={vendeur} className={quantite >= 4000 ? 'highlight' : ""}>
              <td className="seller">{vendeur}</td>
              <td>{quantite} {quantite >= 4000 && "✅"}</td>
              <td>{calculerPrime(quantite)}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    )
}

export default Quotas