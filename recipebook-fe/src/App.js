import './App.css';
import Welcome from './welcome'
import Landing from './landing'
import RecipePage from './recipes'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Welcome/>} />
          <Route path='/home' element={<Landing/>} />
          <Route path='/recipes' element={<RecipePage/>} />
      </Routes>
    </>
  )
}

export default App;
