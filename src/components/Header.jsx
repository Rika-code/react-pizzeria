
import logo from '../assets/img/logo.png'
import './Header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav>
                <ul className="navbar">
                    <Link to="/quotas"> Quotas </Link>
                        <Link to="/">
                            <img src={logo} alt = "logo_pizzeria" className="logo_pizzeria"></img>
                        </Link>
                          <Link to="/secret">Entrepôts</Link>
                </ul>
            </nav>
        </header>
    )
}
export default Header