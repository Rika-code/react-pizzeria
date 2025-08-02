import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import './Entrepots.scss';
import '../css/style.css';

const Entrepots = () => {
    const [data, setData] = useState({});
    const [entrepotSelected, setEntrepotSelected] = useState(null);
    

    useEffect(() => {
        fetch("https://flask-render-production.up.railway.app/api/coffres")
        .then((res) => res.json())
        .then((coffres) => setData(coffres))
        .catch((err) => console.error("Erreur lors du fetch", err))
    }, []);

const handleDelete = async (entrepot, produit) => {
  try {
    const response = await fetch(`https://flask-render-production.up.railway.app/api/coffres/${entrepot}/${encodeURIComponent(produit)}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Mise à jour locale du state pour retirer le produit
      setData(prevData => {
        const newData = { ...prevData };
        if (newData[entrepot]) {
          delete newData[entrepot][produit];
          // Si l'entrepot est vide, on peut aussi le supprimer (optionnel)
          if (Object.keys(newData[entrepot]).length === 0) {
            delete newData[entrepot];
          }
        }
        return newData;
      });
      console.log("Produit supprimé !");
    } else {
      const errData = await response.json();
      console.error("Erreur serveur :", errData.error || "Erreur inconnue");
    }
  } catch (err) {
    console.error("Erreur lors de la requête DELETE", err);
  }
};
    const entrepotsAvailables = Object.keys(data);


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
                 <td>
                   <button
                          onClick={() => {
                            if (window.confirm(`Confirmer la suppression de "${item}" ?`)) {
                              handleDelete(entrepotSelected, item);
                            }
                          }}
                        >
                          Supprimer
                        </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="placeholder">Sélectionnez un entrepôt pour voir son contenu.</p>
      )}
    </>
  );
};


export default Entrepots