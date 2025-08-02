import Header from "../components/Header"
import './HomePage.scss'
import boite from '../assets/img/boite.png'
import chrono from '../assets/img/chrono.png'
import user from '../assets/img/user.png'
import attention from '../assets/img/attention.png'
import {useState, useEffect} from 'react'
import '../css/style.css';


const HomePage = () => {
    const [data, setData] = useState({});
    const [produitsRupture, setProduitsRupture] = useState([]);
    const [totalStock, setTotalStock] = useState(0);
    const [vendeursQuota, setVendeursQuota] = useState([])
    const [vendeursRetard, setVendeursRetard] = useState([])

    useEffect(() => {
        fetch('https://flask-render-production.up.railway.app/api/coffres')
            .then((res) => res.json())
            .then((coffres) => {
                setData(coffres);

                const ruptures = [];
                let total = 0;

                Object.entries(coffres).forEach(([entrepot, produits]) => {
                    Object.entries(produits).forEach(([nomProduit, quantite]) => {
                        total += quantite;
                        if (quantite <= 100) {
                            ruptures.push(`${nomProduit} - ${entrepot}`);
                        }
                    });
                });

                setProduitsRupture(ruptures);
                setTotalStock(total);
            })
            .catch((err) => console.error("Erreur lors du fetch", err));

            fetch("https://flask-render-production.up.railway.app/api/ventes")
                .then(res => res.json())
                .then(data => {
                    const resume = {};

                    data.forEach(({ vendeur, item, quantite}) => {
                        if (item.toLowerCase() === "pizza"){
                            if(!resume[vendeur]) {
                                resume[vendeur] = 0;
                            }
                            resume[vendeur] += quantite;
                        }
                    });
                    const atteints = [];
                    const retard = [];

                    Object.entries(resume).forEach(([vendeur, quantite]) => {
                        if (quantite >= 4000) {
                            atteints.push(vendeur);
                        } else {
                            retard.push(`${vendeur} (${quantite})`);
                        }
                    });
                    
                    setVendeursQuota(atteints);
                    setVendeursRetard(retard)
                })
                .catch((err) => console.error("Erreur lors du fetch ventes", err))
    }, []);
    
    return(
        <body className="back_home">
        <section className="first"> 
            <Header/>
            <div className="home">
                <h1 className="welcome"> Bienvenue sur l'interface de gestion</h1>
                <p className="apercu"> Voici un aperçu de l'activité du jour</p>
            </div>
            <section className="first_box">  
                <div className="check_stock">
                    <img src={boite} alt="boite de stockage" />
                    <p className="total"> Stock Total </p> 
                    <p className="number"> {totalStock}</p>
                    <p> Produits</p>
                </div>
                <div className="quota">
                    <img src={chrono} alt="chronomètre" />
                    <p> Quotas atteints </p>
                    <p className="atteints">{vendeursQuota.length} / {vendeursQuota.length + vendeursRetard.length}</p>
                </div>
                <div className="spy">
                    <img src={user} alt="utilisateur" />
                    <p> Employés à surveiller</p>
                    <ul>
                        {vendeursRetard.slice(0, 3).map((vendeur, index) => (
                            <li key={index}>{vendeur}</li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="second">
            <div className="out">
                <div className="top-line">
                <img src={attention} alt="panneau attention" />
                <p> Produits en rupture de stock</p>
                </div>
                <ul>
                    {produitsRupture.length === 0 ?(
                        <li> Aucun produit en rupture </li>
                    ) : (
                        produitsRupture.map((texte,index) => <li key={index}>{texte}</li>)
                    )}
                </ul>
            </div>
            </section>
       </section>
       </body>
    )
}
export default HomePage
