import './navbar.css'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export function TopNavbar(){
    const scrollFunct = () =>{
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
            document.getElementById('nav').style.backgroundColor = '#ffffff';
        } else {
            document.getElementById('nav').style.backgroundColor = '#ffffff00';
        }
    }

    window.onscroll = function(){
        scrollFunct()
    }

    const loc = useLocation()
    return(
        <nav className='navbar-wrap' id='nav'>
            <Link to='/home' className='logo'>recipebook</Link>
            <div className='but-wrap'>
                {/* <Link>
                    <button id='add'>Add Recipe</button>
                </Link> */}
            </div>
            <div className='searchbar'>
                {/* <input 
                    className='searchbar-input'
                    type='text'
                    placeholder='Search for recepies'>
                </input>
                <button className='button-search'>Search</button> */}
                {loc.pathname == '/recipes' && 
                    <Link to='/recipes/add-your-recipe'>
                        <button id='add'>Add Recipe</button>
                    </Link>
                }
                
            </div>
        </nav>
    )
}