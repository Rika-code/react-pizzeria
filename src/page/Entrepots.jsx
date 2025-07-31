import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import './Entrepots.scss';
import '../css/style.css';

const Entrepots = () => {
    const [data, setData] = useState({});
    const [entrepotSelected, setEntrepotSelected] = useState(null);
    const [depots, setDepots] = useState([])

    useEffect(() => {
        fetch("https://flask-render-production.up.railway.app/api/coffres")
        .then((res) => res.json())
        .then((coffres) => setData(coffres))
        .catch((err) => console.error("Erreur lors du fetch", err))
    }, []);

    const entrepotsAvailables = Object.keys(data);

    useEffect(() => {
      fetch("https://flask-render-production.up.railway.app/api/depots")
      .then((res) => res.json())
      .then((data) => setDepots(data))
      .catch((err) => console.error("Erreur lors du fetch des dépôts", err))
    })
  return (
   <>
      <div className="title">
        <h1>Entrepôts</h1>
      </div>

      <div className="list">
        {entrepotsAvailables.map((nom) => (
          <button
            key={nom}
            className={entrepotSelected === nom ? "active" : ""}
            onClick={() => setEntrepotSelected(nom)}
          >
            {nom}
          </button>
        ))}
      </div>

      {entrepotSelected && data[entrepotSelected] ? (
        <table className="donnees">
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>Quantité</th>
              <th>Dernière MAJ</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data[entrepotSelected]).map(([item, quantite]) => (
              <tr key={item}>
                <td>{item}</td>
                <td>{quantite}</td>
                <td>{new Date().toLocaleDateString("fr-FR")}</td>
                <td className={
                  quantite >= 500 ? 'stock' :
                  quantite >= 100 ? 'faible' :
                  'rupture'
                }>
                    {
                        quantite >= 500 ? 'En Stock ✅' :
                        quantite >= 100 ? 'Faible Stock⚠️' :
                        'Rupture🚫'
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="placeholder">Sélectionnez un entrepôt pour voir son contenu.</p>
      )}
      
      <div className="tableau-depots">
        <h2> Dépots de Tomates et Emmental</h2>
        <table>
          <thead>
            <tr>
              <th> Employé</th>
              <th>Produit</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
          {depots.map((depot, index) => (
            <tr key={index}>
              <td>{depot.joueur}</td>
              <td>{depot.item}</td>
              <td>{depot.quantite}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};


export default Entrepots