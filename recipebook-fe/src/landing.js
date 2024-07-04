import './landing.css'
import {TopNavbar} from './navbar'
import {Recipes} from './recipe-card'
import { CoolSearch } from './cool-search'
import Footer from './footer'

import { Link } from 'react-router-dom';

function Hero(){
    return(
        <div className='hero-wrap'>
            <div className='left'>
                <h1 className='hero-title'>
                    Discover your new favourite dish with our tasty recipes!
                </h1>
                <Link to='/recipes'>
                    <button>Explore</button>
                </Link>
                
            </div>
            <div className='right'>
                <svg className='blob' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                            <stop offset="0%" stop-color="#ffff00" />
                            <stop offset="20%" stop-color="#ffb100" />
                            <stop offset="70%" stop-color="#f94848" />
                        </linearGradient>
                    </defs>
                    <path fill='url(#grad)'d="M54.6,-61.1C64.4,-44.8,61.6,-22.4,61.9,0.3C62.1,22.9,65.4,45.8,55.6,62.3C45.8,78.7,22.9,88.8,1.6,87.2C-19.7,85.6,-39.4,72.3,-54.7,55.8C-70.1,39.4,-81.2,19.7,-78.7,2.6C-76.1,-14.6,-59.9,-29.1,-44.5,-45.4C-29.1,-61.7,-14.6,-79.7,3.9,-83.6C22.4,-87.5,44.8,-77.3,54.6,-61.1Z" transform="translate(100 100)" />
                </svg>
                <div className='hero-img'></div>
            </div>
        </div>
    )
}


export default function Landing(){
    return(
        <>
            <TopNavbar />
            <Hero />
            <CoolSearch />
            <Recipes />
            <Footer />
        </>
    )
}