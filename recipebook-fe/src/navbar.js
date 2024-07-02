import './navbar.css'
import { Link } from "react-router-dom";


export function TopNavbar(){
    return(
        <nav className='navbar-wrap' id='nav'>
            <Link to='/' className='logo'>recipebook</Link>
            <div className='menu'>
                <div className='menu-item'>
                    <Link to='/' className='navbar-link'>Cusine</Link>
                </div>
                <div className='menu-item'>
                    <Link to='/' className='navbar-link'>Diet</Link>
                </div>
            </div>
            <div className='searchbar'>
                <input 
                    className='searchbar-input'
                    type='text'
                    placeholder='Search for recepies'>
                </input>
                <button className='button-search'>Search</button>
            </div>
        </nav>
    )
}