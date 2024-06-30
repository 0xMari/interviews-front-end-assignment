import './navbar.css'

function Navbar(){
    return(
        <div className='navbar-wrap'>
            <div className='logo'>recipebook</div>
            <div className='menu'>
                <div>Cusine</div>
                <div>Diet</div>
            </div>
            <div className='searchbar'>
                <div className='input'></div>
                <button className='search'>search</button>
            </div>
        </div>
    )
}