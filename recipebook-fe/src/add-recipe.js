import './add-recipe.css'
import { useState, useEffect } from 'react';
import Footer from './footer';
import { TopNavbar } from './navbar';

export function AddRecipe(){
    const [recipe, setRecipe] = useState({})

    const [formIng, setFormIng] = useState([]);

    const [cuisine, setCuisine] = useState([]);
    const [diet, setDiet] = useState([]);
    const [difficulty, setDifficulty] = useState([]);

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchCuisine = async() =>{
            try{
                const cuisineRes = await fetch('http://localhost:8080/cuisines');
                const cuisine = await cuisineRes.json();

                setCuisine(cuisine);

            } catch(error){
                console.error('data fetching error', error);
            }
        };
        const fetchDiet = async() =>{
            try{
                const dietRes = await fetch('http://localhost:8080/diets');
                const diet = await dietRes.json();

                setDiet(diet);

            } catch(error){
                console.error('data fetching error', error);
            }
        };

        const fetchDifficulty = async() =>{
            try{
                const difficultyRes = await fetch('http://localhost:8080/difficulties');
                const difficulty = await difficultyRes.json();

                setDifficulty(difficulty);

            } catch(error){
                console.error('data fetching error', error);
            }
        };

        

        fetchCuisine();
        fetchDiet();
        fetchDifficulty();

    }, []);

    const handleAdd = () => {
        setFormIng([...formIng, {ingredients:''}])
    };
    const handleDelete = (i) => {
        const deletedValue = [...formIng]
        deletedValue.splice(i,1)
        
        setFormIng(deletedValue)
        
    };

    const handleIng = (e,i) =>{
        const {value} = e.target
        const onchangeVal = [...formIng]
        onchangeVal[i] = value

        setFormIng(onchangeVal)
        
    }
    const handleChange = (e) =>{
        const {name, value} = e.target
        setRecipe(prevState =>({
            ...prevState,
            [name]: value
        }))
    }

    // var ingredients=[]


    // setRecipe(
    //     ('ingredients'= formIng)
    // )
    const confirmIng = () =>{
        setRecipe(prevState => ({
            ...prevState,
            'ingredients' : formIng
        }))
    }
    const submitRecipe = (e) =>{
        e.preventDefault();
        alert(`submitted ${JSON.stringify(recipe)}`)
        fetch('http://localhost:8080/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            //headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        .then((res) => res.json())
         .then((post) => {
            setPosts((posts) => [post, ...posts]);
         })
         .catch((err) => {
            console.log(err.message + 'hello');
         });
    }
    
    return(
        <>
            <TopNavbar />
            <div className='addRec-wrap'>
                <div className='addRec-title'>recipe details</div>
                <div>
                    <div className='addRec-name'>
                        <div className='cat-header'>Recipe Name</div>
                        <input 
                            name='name'
                            value={recipe.name}
                            placeholder='Recipe name'
                            onChange={(e) =>handleChange(e)}
                            />
                    </div>
                    <div className='addRec-ingredients'>
                        <div className='cat-header'>Ingredients</div>
                        <div className='ingr-list' >
                            {formIng.map((item, i) =>
                                <div>
                                    <input className='ingr-item' name='ingredients' 
                                        value={item.ingredients}  
                                        placeholder='ingredient' 
                                        onChange={(e)=>handleIng(e,i)}/>
                                    <button className='dlt-btn' onClick={() =>handleDelete(i)}>×</button>
                                </div>
                            )}
                            <button className="add-btn" onClick={handleAdd}>+ add ingredient</button>
                            <button className='add-btn' onClick={confirmIng}>save ingredients</button>
                        </div>
                    </div>
                    <div className='addRec-inst'>
                        <div className='cat-header'>
                            <label>Instruction</label>
                        </div>
                        <textarea 
                            className='inst-text'
                            name='instructions'
                            value={recipe.instructions}
                            placeholder='Add the instructions!'
                            onChange={(e) =>handleChange(e)}
                            />
                    </div>
                    <div className='addRec-sel'>
                        <div className='cat-header'>Select cuisine</div>
                    
                        <select onChange={(e) => handleChange(e)} name='cuisineId' value={recipe.cuidineId}>
                            <option disabled selected value=''>cuisine</option> 
                            {cuisine.map((item,i) =>{
                                return(
                                <option label={item.name}>{item.id}</option>)
                            })}
                        
                        </select>
                    </div>
                    <div className='addRec-sel'>
                        <div className='cat-header'>Select diet</div>
                    
                        <select onChange={(e) => handleChange(e)} name='dietId' value={recipe.dietId}>
                            <option disabled selected value=''>diet</option> 
                            {diet.map((item,i) =>{
                                return(
                                <option label={item.name}>{item.id}</option>)
                            })}
                        
                        </select>
                    </div>
                    <div className='addRec-sel'>
                        <div className='cat-header'>Select difficulty</div>
                    
                        <select onChange={(e) => handleChange(e)} name='difficultyId' value={recipe.difficultyId}>
                            <option disabled selected value=''>difficulty</option> 
                            {difficulty.map((item,i) =>{
                                return(
                                <option label={item.name}>{item.id}</option>)
                            })}
                        
                        </select>
                    </div>
                    <div> 
                        <div className='cat-header' id='img-add'>Add Image</div>
                            <label className='custom-upl'>
                                <input type="file" accept="image/*" name='image' value={recipe.image} onChange={handleChange} />
                                Upload image
                            </label>
                    </div>
                    <p>{JSON.stringify(recipe)}</p>
                    <div className='sbm-btn'>
                        <button type='submit' onClick={(e) =>submitRecipe(e)}>Submit</button>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>
    )
}


