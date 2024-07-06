import './recipe-card.css'
import { useState, useEffect, useCallback, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';




function RecipeBox({id, idr, button, name, cuisine, diet, difficulty, image, ingredients, instructions}){
    const dataToPass = {
        id: idr,
        name: name,
        cuisine: cuisine,
        diet: diet,
        difficulty:difficulty,
        image: image,
        ingredients: ingredients,
        instructions : instructions,
    }
    const path = `/recipes/${name}`
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
                {/* <div className='recipe-rating'>Rating</div> */}
                <Link to={path} state= {dataToPass}>
                    <button className='button-details' id={button}>View details</button>
                </Link>
                
            </div>
        </div>
        </>
    )
}


export function RecipesHome(){ //homepage "popular dishes"
    
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
        <div className='recipesCard-wrap-home carousel'>
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


export function RecipesExplore(){ // recipes page
    
    const [recipes, setRecipes] = useState([]);
    const [sortedRecipes, setSortedRecipes] = useState([]);

    const [cuisine, setCuisine] = useState([]);
    const [diet, setDiet] = useState([]);
    const [difficulty, setDifficulty] = useState([]);

    useEffect(() => {
        
        const fetchRecipes = async() =>{
            try{
                const recipesRes = await fetch('http://localhost:8080/recipes');
                const recipes = await recipesRes.json();

                setRecipes(recipes);
                setSortedRecipes(recipes);


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

            } catch(error){
                console.error('data fetching error', error);
            }
        };

        fetchRecipes();

    }, []);

    const handleSortChange = (processedData) => {
        
        setSortedRecipes(processedData);
        
    };
    const handleFilterChange = useCallback((processedData) => {
        setSortedRecipes(processedData);
        
    }, []);

    // const [query, setQuery] = useState("");

    // const search_parameters = Object.keys(Object.assign({}, ...recipes));

    // function search(recipes) {

    //     return recipes.filter((recipes) =>
    //         search_parameters.some((parameter) =>
    //             recipes[parameter].toString().toLowerCase().includes(query)
    //         )
    //     );
    // }

    // const handleSearch = () =>{
    //     search()
    // }

    return(
        <div className='results-wrap'>
            {/* <div className='sortSearch-wrap'>
                <div>
                    <input 
                        className='recipes-search' 
                        type='text' 
                        placeholder='Search recipes'
                        onChange={(e) =>setQuery(e.target.value)}/>
                    <button className='recipes-search-btn'
                        onClick={handleSearch}>Search</button>
                </div> 
            </div> */}
            <Sorting onSortChange={handleSortChange} ricette={recipes} />
            <div className='results-section'>
                <Filtering onFilterChange={handleFilterChange} 
                            ricette={sortedRecipes}
                            cuisine={cuisine}
                            diet={diet}
                            diff={difficulty} />
                {sortedRecipes.length>0 && <Recipes ricette={sortedRecipes}
                        cuisine={cuisine}
                        diet={diet}
                        diff={difficulty}/>}
            </div>
            
        </div>
    )
}



function Recipes({ricette, cuisine, diet, diff}){ //limit recipes shown
    
    const [isLoading, setIsLoading] = useState(false);
    const [visibleData, setVisibleData] = useState([]);
    const [page, setPage] = useState(0);

    const servUrl = 'http://localhost:8080'


    useEffect(() => {
        setIsLoading(true);
        const showLess = async() =>{
            try{
                setVisibleData(ricette.slice(0, 5));

            } catch(error){
                console.error('data fetching error', error);
            }
        };

        showLess();
        setIsLoading(false);

    }, [ricette]);

    const handleShowMore = () => {
        const newPage = page + 1;
        const newVisibleData = ricette.slice(0, 5 + newPage * 10);
        setVisibleData(newVisibleData);
        setPage(newPage);
    };


    return(
        <>
        <div className='recipesCard-wrap'>
            {/* {isLoading ? <p>Loading...</p> : null} */}
            {visibleData.map((item) => (
                <RecipeBox 
                    idr={item.id}
                    name={item.name}
                    cuisine={cuisine[item.cuisineId]}
                    diet={diet[item.dietId]}
                    difficulty={diff[item.difficultyId]}
                    image={servUrl+item.image}
                    ingredients={item.ingredients}
                    instructions = {item.instructions}
                    />
            ))}
            {visibleData.length < ricette.length && (
                <button onClick={handleShowMore}>Show More</button>
            )}
        </div>
        </>
    )
}


function Sorting({onSortChange, ricette}){ //ascending sorting filter
    const [sortKey, setSortKey] = useState([])
    
    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };

    const applySort = () => {
        let processedData = [...ricette];

            if (sortKey) {
                processedData.sort((a,b) => {
                    if (a[sortKey] < b[sortKey]) return -1;
                    if (a[sortKey] > b[sortKey]) return +1;
                    return 0;
                })
            }
        
        onSortChange(processedData);
    }

    useEffect(() => {
        applySort();
    }, [sortKey, ricette]);

    return(
        <>
        <select className='sort-wrap' onChange={handleSortChange} value={sortKey}>
            <option disabled selected value=''>Sort by</option>
            <option label='Name (A-Z)'>name</option>
            <option label='Difficulty (Easy-Hard)'>difficultyId</option>
            <option label='Diet (A-Z)'>dietId</option>
            <option label='Default'>id</option>
            
        </select>
        </>
    )
}

function Filtering({onFilterChange, ricette, cuisine, diet, diff}){ //filtering, apply filters correctly - need to resort to apply deselection
    const filters = useRef({
        difficultyId: [],
        dietId: [],
        cuisineId: [],
    })
    const memo = ricette

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        checked ? filters.current[name].push(value): filters.current[name] = filters.current[name].filter((f) => f !== value);
        var conditions = []
        if (filters.current["difficultyId"].length > 0) {
            conditions.push(function (ricetta) {
                for (let i = 0; i < filters.current.difficultyId.length; i++) {
                    return ricetta.difficultyId == filters.current.difficultyId[i]
                }
            });
        }
        
        if (filters.current["dietId"].length > 0) {
            conditions.push(function (ricetta) {
                for (let i = 0; i < filters.current.dietId.length; i++) {
                    return ricetta.dietId == filters.current.dietId[i]
                }
            });
        };
        
        if (filters.current["cuisineId"].length > 0) {
            conditions.push(function (ricetta) {
                for (let i = 0; i < filters.current.cuisineId.length; i++) {
                    return ricetta.cuisineId == filters.current.cuisineId[i]
                }
            });
        };
        
        var itemsMatchingCondition = ricette.filter(function (ricetta) {
            return conditions.every(function (c) {
                return c(ricetta);
            });
        });
        
        onFilterChange(itemsMatchingCondition)

    };

    

    return(
        <>
        <div className='filters-wrap'>
            <div className='filter-first-title'>Filter by</div>
            <div className='filter-section'>
                <div className='filter-title'>Difficulty</div>
                {Object.keys(diff).map((item, i) => (
                    <li key={i} className='filter-element'>
                    <input 
                        type='checkbox' 
                        // name={diff[item]} 
                        name = 'difficultyId'
                        value={item}
                        onChange={handleCheckboxChange}
                        />
                    <label>{diff[item]}</label>
                    </li>
                ))}
            </div>
            <div className='filter-section'>
                <div className='filter-title'>Diet</div>
                {Object.keys(diet).map((item, i) => (
                    <li key={i} className='filter-element'>
                    <input 
                        type='checkbox' 
                        name= 'dietId'
                        value={item}
                        onChange={handleCheckboxChange}
                        />
                    <label>{diet[item]}</label>
                    </li>
                ))}
            </div>
            <div className='filter-section'>
                <div className='filter-title'>Cuisine</div>
                {Object.keys(cuisine).map((item, i) => (
                    <li key={i} className='filter-element'>
                    <input 
                        type='checkbox'
                        name='cuisineId'
                        value={item}
                        onChange={handleCheckboxChange}
                        />
                    <label>{cuisine[item]}</label>
                    </li>
                ))}
            </div>
            {/* <div className='filter-button'>
                <button className='button-item' id='reset' onClick={handleReset}>Reset</button>
                <button className='button-item'>Apply</button>
            </div> */}
            
        </div>
        </>
    )
}