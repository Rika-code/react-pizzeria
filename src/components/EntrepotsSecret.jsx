import { useState} from 'react'
import Entrepots from '../page/Entrepots'
import Header from './Header';
import './EntrepotsSecret.scss'

const EntrepotsSecret = () => {
    const [code, setCode] = useState("")
    const [ accesAutorise, setAccesAutorise] = useState(false);

    const CODE_SECRET = "4686";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === CODE_SECRET) {
            setAccesAutorise(true)
        } else {
            alert("❌ Code incorrect")
        }
    }

    return(
        <>
        <Header/>
          <div className='code'>
      {!accesAutorise ? (
        <form onSubmit={handleSubmit}>
          <label>Entrez le code d’accès :</label><br />
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code secret"
          />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <Entrepots/>
      )}
    </div>
    </>
    )
}

export default EntrepotsSecret;