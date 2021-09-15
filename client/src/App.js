import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Help from './components/Help/Help';
import Cart from './components/Cart/Cart';
import Detail from './components/Detail/Detail';
import Error404 from './components/Error404/Error404';

import './App.css';
// import SignInOutContainer from './components/Login';
//import Login from './components/Login/Login';
//import Register from './components/Register/Register';
import Checkout from './components/Checkout/Checkout';
import Company from './components/Company/Company';
import Team from './components/Team/Team';
import Our from './components/Our/Our';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Register/SignUp';
import Admin from './components/AdminPanel/Admin';
import Categories from './components/AdminPanel/Categories/Categories';
import CategoryCreate from './components/AdminPanel/Categories/CategoryCreate';
import CategoryUpdate from './components/AdminPanel/Categories/CategoryUpdate';
import Products from './components/AdminPanel/Products/Products';

import ProductCreate from './components/AdminPanel/Products/ProductCreate';
import ProductUpdate from './components/AdminPanel/Products/ProductUpdate';

import TestCode from './components/AdminPanel/Categories/testCode';

import Politica from './components/Politica/Politica';

function App() {
	return (
		<HashRouter>
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
					<Route exact path="/politica" component={Politica} />
					{/* --- Panel del Administrador  */}
					<Route exact path="/admin/adminpanel" component={Admin} />
					<Route exact path="/admin/adminpanel/categories" component={Categories} />
					<Route exact path="/admin/adminpanel/categoriesCreate" component={CategoryCreate} />
					<Route exact path="/admin/adminpanel/categoriesUpdate/:id" component={CategoryUpdate} />

					<Route exact path="/admin/adminpanel/products" component={Products} />
					<Route exact path="/admin/adminpanel/productCreate" component={ProductCreate} />
					<Route exact path="/admin/adminpanel/productUpdate/:id" component={ProductUpdate} />
					
					<Route exact path="/admin/adminpanel/test" component={TestCode} />
					{/* --- Fin: Panel del Administrador  */}
					<Route path="*" component={Error404} />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
