import './welcome.css'

import { Link } from 'react-router-dom';

function Welcome(){
    return(
        <div className='welcome-wrap'>
            <div className='welcome-img'>

            </div>
            <div className='welcome-text'>
                <div className='welcome-chef'/>
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