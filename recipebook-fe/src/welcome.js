import './welcome.css'

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
                <button className='welcome-button'>Explore</button>
                
            </div>

        </div>
    )
}

export default Welcome;