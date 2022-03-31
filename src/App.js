import Movies from './Components/Movies';
import { getMovies } from './Components/getMovies';
import About from './Components/About';
import Home from './Components/Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Nav from './Nav';

function App() {
  return (
    // <>
    // <Home/>
    // <Movies/>
    // <About/>
    // </>
    <Router>
      <Nav/>
     <Switch>
     <Route path='/' exact  component ={Home}/>
      <Route path='/movies' component ={Movies}/>
        {/* <Route path='/about' component={About} isAuth={true} /> */}
      <Route path='/about' render={(props)=>(
      <About {...props} isAuth={true}/>
    )}/>
     </Switch>
   </Router>
  );
}

export default App;
