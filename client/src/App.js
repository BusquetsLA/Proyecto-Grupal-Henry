import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Help from './components/Help/Help';
import Cart from './components/Cart/Cart';
import Detail from './components/Detail/Detail';
import Error404 from './components/Error404/Error404';

import './App.css';
import SignInOutContainer from './components/Login';
//import Login from './components/Login/Login';
//import Register from './components/Register/Register';
import Checkout from './components/Checkout/Index';
import Company from './components/Company/Company';
import Team from './components/Team/Team';
import Our from './components/Our/Our';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Register/SignUp';
import Admin from './components/AdminPanel/Admin';
import CreateCategory from './components/AdminPanel/CreateCategory/CreateCategory';
import CreateProduct from './components/CreateProduct/CreateProduct';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/detail/:id" component={Detail} />
					<Route exact path="/shop" component={Shop} />
					<Route exact path="/cart" component={Cart} />
					<Route exact path="/checkout" component={Checkout} />
					<Route exact path="/about" component={About} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/login" component={SignIn} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/company" component={Company} />
					<Route exact path="/team" component={Team} />
					<Route exact path="/our" component={Our} />

					{/* --- Panel del Administrador  */}
					<Route exact path="/admin/adminpanel" component={Admin} />
					<Route exact path="/admin/adminpanel/categories" component={CreateCategory} />
					<Route exact path="/admin/prdcreate" component={CreateProduct} />
					{/* --- Fin: Panel del Administrador  */}
					<Route path="*" component={Error404} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
