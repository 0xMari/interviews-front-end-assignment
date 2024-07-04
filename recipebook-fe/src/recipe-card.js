import './recipe-card.css'
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';


function RecipeBox({id, button, name, cuisine, diet, difficulty, image}){
    return(
        <>
        <div className='recipe-wrap' id={id}>
            <img className='recipe-img' src={image} alt={image}></img>
            <div className='recipe-details'>
                <div className='recipe-title'>{name}</div>
                <div className='recipe-tags'>
                    <div className='recipe-cusine'>{cuisine}&nbsp;</div>
                    <div className='recipe-diet'>|&nbsp;{diet}</div>
                </div>
                <div className='recipe-diff'>{difficulty}</div>
            </div>
            <div className='recipe-details2'>
                <div className='recipe-rating'>Rating</div>
                <button className='button-details' id={button}>View details</button>
            </div>
        </div>
        </>
    )
}


export function Recipes(){
    
    const [recipes, setRecipes] = useState([]);
    const [cuisine, setCuisine] = useState([]);
    const [diet, setDiet] = useState([]);
    const [difficulty, setDifficulty] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [visibleData, setVisibleData] = useState([]);

    const servUrl = 'http://localhost:8080'

    useEffect(() => {
        setIsLoading(true);
        const fetchRecipes = async() =>{
            try{
                const recipesRes = await fetch('http://localhost:8080/recipes');
                const recipes = await recipesRes.json();

                setRecipes(recipes);


                const cuisineRes = await fetch('http://localhost:8080/cuisines');
                const cuisine = await cuisineRes.json();

                const cuisineMap = cuisine.reduce((acc, cuisine) => {
                    acc[cuisine.id] = cuisine.name;
                    return acc;
                }, {});

                setCuisine(cuisineMap);

                const dietRes = await fetch('http://localhost:8080/diets');
                const diet = await dietRes.json();

                const dietMap = diet.reduce((acc, diet) => {
                    acc[diet.id] = diet.name;
                    return acc;
                }, {});

                setDiet(dietMap);

                const difficultyRes = await fetch('http://localhost:8080/difficulties');
                const difficulty = await difficultyRes.json();

                const difficultyMap = difficulty.reduce((acc, difficulty) => {
                    acc[difficulty.id] = difficulty.name;
                    return acc;
                }, {});

                setDifficulty(difficultyMap);
                
                setVisibleData(recipes.slice(0, 3));

            } catch(error){
                console.error('data fetching error', error);
            }
        };

        fetchRecipes();
        setIsLoading(false);

    }, []);

    const cards = ['1', '2', '3', '4'];
    const [currentIndex, setCurrentIndex] = useState(0)

    const carouselInfScroll = () => {
        if (currentIndex == cards.length-1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex+1)
    }

    useEffect(() => {
        const interval = setInterval(() =>{carouselInfScroll()}, 3000)

        return () => clearInterval(interval)
    })

    return(
        <div className='recipesCard-wrap carousel'>
            <h2>Popular dishes</h2>
            {isLoading ? <p>Loading...</p> : null}
            <Marquee pauseOnHover autoFill speed='100'className='marq'>
            {visibleData.map((recipe) => (
                <RecipeBox 
                    id='carousel-item'
                    button = 'carousel-item-button'
                    name={recipe.name}
                    cuisine={cuisine[recipe.cuisineId]}
                    diet={diet[recipe.dietId]}
                    difficulty={difficulty[recipe.difficultyId]}
                    image={servUrl+recipe.image}/>
            ))}
            </Marquee>
            
        </div>
    )
}


export function RecipesExplore(){
    
    const [recipes, setRecipes] = useState([]);
    const [cuisine, setCuisine] = useState([]);
    const [diet, setDiet] = useState([]);
    const [difficulty, setDifficulty] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [visibleData, setVisibleData] = useState([]);
    const [page, setPage] = useState(0);

    const servUrl = 'http://localhost:8080'



    useEffect(() => {
        setIsLoading(true);
        const fetchRecipes = async() =>{
            try{
                const recipesRes = await fetch('http://localhost:8080/recipes');
                const recipes = await recipesRes.json();

                setRecipes(recipes);


                const cuisineRes = await fetch('http://localhost:8080/cuisines');
                const cuisine = await cuisineRes.json();

                const cuisineMap = cuisine.reduce((acc, cuisine) => {
                    acc[cuisine.id] = cuisine.name;
                    return acc;
                }, {});

                setCuisine(cuisineMap);

                const dietRes = await fetch('http://localhost:8080/diets');
                const diet = await dietRes.json();

                const dietMap = diet.reduce((acc, diet) => {
                    acc[diet.id] = diet.name;
                    return acc;
                }, {});

                setDiet(dietMap);

                const difficultyRes = await fetch('http://localhost:8080/difficulties');
                const difficulty = await difficultyRes.json();

                const difficultyMap = difficulty.reduce((acc, difficulty) => {
                    acc[difficulty.id] = difficulty.name;
                    return acc;
                }, {});

                setDifficulty(difficultyMap);
                
                setVisibleData(recipes.slice(0, 5));

            } catch(error){
                console.error('data fetching error', error);
            }
        };

        fetchRecipes();
        setIsLoading(false);

    }, []);

    const handleShowMore = () => {
        const newPage = page + 1;
        const newVisibleData = recipes.slice(0, 5 + newPage * 10);
        setVisibleData(newVisibleData);
        setPage(newPage);
    };


    return(
        <div className='recipesCard-wrap'>
            {isLoading ? <p>Loading...</p> : null}
            {visibleData.map((recipe) => (
                <RecipeBox 
                    name={recipe.name}
                    cuisine={cuisine[recipe.cuisineId]}
                    diet={diet[recipe.dietId]}
                    difficulty={difficulty[recipe.difficultyId]}
                    image={servUrl+recipe.image}/>
            ))}
            {visibleData.length < recipes.length && (
                <button onClick={handleShowMore}>Show More</button>
            )}
        </div>
    )
}




