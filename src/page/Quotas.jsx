import { useState, useEffect} from 'react'
import Header from '../components/Header';
import './Quotas.scss'

const Quotas = () => {  
    const [ventes, setVentes] = useState([])

    useEffect(() => {
        fetch("https://flask-pizzeria.onrender.com/ventes")
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

    return (
        <>
        <Header/>
          <div className="p-4">
      <h1 className="compta">Comptabilité Runner</h1>
      <table className="tableau">
        <thead>
          <tr>
            <th className="runner">Runner</th>
            <th className="pizzas">Pizzas vendues</th>
            <th className ="total"> Total </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ventes).map(([vendeur, quantite]) => (
            <tr key={vendeur} className={quantite >= 4000 ? 'highlight' : ""}>
              <td className="seller">{vendeur}</td>
              <td className="quantity">{quantite}</td>
              <td>{quantite} {quantite >= 4000 && "✅"}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    )
}

export default Quotas