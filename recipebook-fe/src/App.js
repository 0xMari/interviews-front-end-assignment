import './App.css';
import Welcome from './welcome'
import Landing from './landing'
import RecipePage from './recipes'
import { Route, Routes } from 'react-router-dom';
import { RecipeDetails } from './recipe-details';
import { AddRecipe } from './add-recipe';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Welcome/>} />
          <Route path='/home' element={<Landing/>} />
          <Route path='/recipes' element={<RecipePage/>} />
          <Route path='/recipes/:recipe' element={<RecipeDetails/>} />
          <Route path='/recipes/add-your-recipe' element={<AddRecipe/>} />
      </Routes>
    </>
  )
}

export default App;
