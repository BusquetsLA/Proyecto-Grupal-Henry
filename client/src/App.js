import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./Componentes/Home/Home";
import About from "./Componentes/About/About";
import Shop from "./Componentes/Shop/Shop";
import Help from "./Componentes/Help/Help";
import Cart from "./Componentes/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route path='/' component = {Home}/>
    <Route path='/Shop' component = {Shop}/>
    <Route exact path='/Cart' component = {Cart}/>
    <Route exact path='/About' component = {About}/>
    <Route exact path= '/Help' component = {Help}/>
    </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
