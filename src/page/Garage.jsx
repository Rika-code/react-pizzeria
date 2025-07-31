import { useEffect, useState } from "react";

function Garage () {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://flask-render-production.up.railway.app/api/coffres")
      .then((res) => res.json())
      .then((coffres) => setData(coffres))
      .catch((err) => console.error("Erreur lors du fetch:", err));
  }, []);

  return (
    <div>
      <h1>Contenu des entrepôts</h1>
      {Object.entries(data).map(([entrepot, items]) => (
        <div key={entrepot}>
          <h2>{entrepot}</h2>
          <ul>
            {Object.entries(items).map(([item, quantite]) => (
              <li key={item}>{item} : {quantite}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Garage