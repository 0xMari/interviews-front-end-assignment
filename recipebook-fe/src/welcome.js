import './welcome.css'

import { Link } from 'react-router-dom';

function Welcome(){
    return(
        <div className='welcome-wrap'>
            <img src='../odiseo-castrejon-1SPu0KT-Ejg-unsplash.jpg' className='welcome-img'/>
            <div className='welcome-text'>
                <img src='../chef-hat_1186963.png' className='welcome-chef'/>
                <div className='welcome-title'>
                    <h1 className='welcome-recipe'>RecipeBook</h1>
                    <h3 className='welcome-discover'>Discover Recipes</h3>
                </div>
                <Link to='/home'>
                    <button className='welcome-button'>Explore</button>
                </Link>
                
            </div>

        </div>
    )
}

export default Welcome;