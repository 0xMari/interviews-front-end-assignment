import './recipes.css'
import {TopNavbar} from './navbar'
import {RecipesExplore} from './recipe-card'
import Footer from './footer'

import { Link } from 'react-router-dom'; 

export default function RecipePage(){
    return(
        <>
        <TopNavbar />
        <div className='content-wrap'>
            
                <RecipesExplore />
        </div>
        
        <Footer />
        </>
    )
}

