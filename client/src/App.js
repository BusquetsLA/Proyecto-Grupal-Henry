import { HashRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';


import Home from './components/Home/Home';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Help from './components/Help/Help';
import Cart from './components/Cart/Cart';
import Detail from './components/Detail/Detail';
import Error404 from './components/Error404/Error404';

import Checkout from './components/Checkout/Checkout';
import Company from './components/Company/Company';
import Team from './components/Team/Team';
import Our from './components/Our/Our';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Register/SignUp';
import Admin from './components/AdminPanel/Admin';
import Validate from './components/AdminPanel/Validate';
import Categories from './components/AdminPanel/Categories/Categories';
import CategoryCreate from './components/AdminPanel/Categories/CategoryCreate';
import CategoryUpdate from './components/AdminPanel/Categories/CategoryUpdate';

import Products from './components/AdminPanel/Products/Products';
import ProductCreate from './components/AdminPanel/Products/ProductCreate';
import ProductUpdate from './components/AdminPanel/Products/ProductUpdate';

import Users from './components/AdminPanel/Users/Users';
import UserUpdate from './components/AdminPanel/Users/UserUpdate';

import Orders from './components/AdminPanel/Orders/Orders';
import OrderDetail from './components/AdminPanel/Orders/OrderDetail';
import PaymentStatus from './components/PaymentStatus/PaymentStatus';

import UserOrders from './components/UserPanel/Orders/Orders';
import UserOrdersDetail from './components/UserPanel/Orders/OrderDetail';

import DetailReview from './components/DetailReview/DetailReview';

import Politica from './components/Politica/Politica';
import UserOrdenes from './components/Ordenes/UserOrdenes';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {
	const userInfo = useSelector((state) => state.userInfo);

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
					<Route exact path="/user/ordenes" component={UserOrdenes} />
					<Route exact path="/user/reset/:id/:token" component={ResetPassword} />
					<Route exact path="/paymentstatus/:status" component={PaymentStatus} />
					{/* --- Panel del Administrador  */}
					<Route exact path="/admin/validate" component={Validate} />

					<Route exact path="/admin/adminpanel" render={()=>{
						return userInfo && userInfo.isAdmin ? <Admin/> : <Error404 to='/'/>
					}} />
					<Route exact path="/admin/adminpanel/categories" render={()=>{
						return userInfo && userInfo.isAdmin ? <Categories/> : <Error404 to='/'/>
					}} />
					<Route exact path="/admin/adminpanel/categoriesCreate" render={()=>{
						return userInfo && userInfo.isAdmin ? <CategoryCreate/> : <Error404 to='/'/>
					}} />
					<Route exact path="/admin/adminpanel/categoriesUpdate/:id" render={()=>{
						return userInfo && userInfo.isAdmin ? <CategoryUpdate/> : <Error404 to='/'/>
					}} />

					<Route exact path="/admin/adminpanel/products" render={()=>{
						return userInfo && userInfo.isAdmin ? <Products/> : <Error404 to='/'/>
					}} />
					<Route exact path="/admin/adminpanel/productCreate" render={()=>{
						return userInfo && userInfo.isAdmin ? <ProductCreate/> : <Error404 to='/'/>
					}} />
					<Route exact path="/admin/adminpanel/productUpdate/:id" render={()=>{
						return userInfo && userInfo.isAdmin ? <ProductUpdate/> : <Error404 to='/'/>
					}} />
					
					<Route exact path="/admin/adminpanel/users" render={()=>{
						return userInfo && userInfo.isAdmin ? <Users/> : <Error404 to='/'/>
					}} />
					<Route exact path="/admin/adminpanel/userUpdate/:id" render={()=>{
						return userInfo && userInfo.isAdmin ? <UserUpdate/> : <Error404 to='/'/>
					}} />
					
					<Route exact path="/admin/adminpanel/orders" render={()=>{
						return userInfo && userInfo.isAdmin ? <Orders/> : <Error404 to='/'/>
					}} />
					<Route exact path="/admin/adminpanel/orderUpdate/:id" render={()=>{
						return userInfo && userInfo.isAdmin ? <OrderDetail/> : <Error404 to='/'/>
					}} />
					
					<Route exact path="/admin/userpanel/orders" component={UserOrders} />
					<Route exact path="/admin/userpanel/orderDetail/:id" component={UserOrdersDetail} />
					<Route exact path="/admin/userpanel/review/:id" component={DetailReview} />
					{/* --- Fin: Panel del Administrador  */}
					<Route path="*" component={Error404} />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
