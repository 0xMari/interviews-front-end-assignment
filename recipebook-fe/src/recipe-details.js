import { useEffect, useState } from 'react'
import './recipe-details.css'
import { useLocation } from 'react-router-dom';
import moment from 'moment'
import { TopNavbar } from './navbar';
import Footer from './footer';

export function RecipeDetails(props){
    
    const loc = useLocation()
    const {id, name, cuisine, diet, difficulty, image, ingredients, instructions} = loc.state

    let i;
    

    //const id = 1;
    const [reviews, setReviews] = useState([])

    useEffect(() =>{
        const fetchReviews = async () =>{
        try{
            const reviewsRes = await fetch('http://localhost:8080/comments');
            const reviews = await reviewsRes.json();

            setReviews(reviews);
        } catch(error){
            console.error('data fetching error', error);
        }
    }
    fetchReviews()
    }, [])

    
    // let r = 0
    // for(var c = 0; c< reviews.length; c++){
    //     r += reviews[c].rating
    // }
    // let avg = (r/reviews.length).toFixed(2)
    

    return(
        <>
        <TopNavbar />
        <div className='recipeDetails-wrap'>
            <h1 className='recipeDetails-title'>{name}</h1>
            <img className='recipeDetails-img' src={image}/>
            <div className='recipeDetails-info'>
                <div className='info'>{cuisine}</div>
                <div className='info'>{diet}</div>
                <div className='info'>{difficulty}</div>
                {/* <div className='avg info'>{avg}/5</div> */}
            </div>
            <div className='recipeDetails-ingr'>
                <h3>Ingredients</h3>
                {ingredients.map((item)=>(
                    <li className='ingredient-item'>{item}</li>
                ))}
            </div>
            <div className='recipeDetails-proc'>
                <h3>Instructions</h3>
                <p>{instructions}</p>
            </div>
            <div className='recipeDetails-review'>
                <h3>Users review</h3>
                {reviews.map((review) => 
                    review.recipeId == id &&     
                    (<div className='review-wrap'>
                        <img className='avatar' src='../panda.png'/>
                        <div className='review'>
                            <div className='review-date'>
                                {moment.utc(review.date).format('MMM Do YYYY, h:mm')}
                            </div>
                            <div className='review-rating'>
                                {review.rating}/5
                                </div>
                            <div className='review-text'>{review.comment}</div>
                        </div>
                    </div>)
                )}
                
            </div>
            <div className='recipeDetails-addre'>
                <textarea className='add-comment' type='text' placeholder='Leave your review here!'></textarea>
                <button>Add review</button>
            </div>
        </div>
        <Footer />
        </>
    )
}

