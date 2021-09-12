import React, { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../media/LogoEstiloPropio.png";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase"
import {
  getCategories,
  getProducts,
  filterByCategory,
  orderByPrice,
  orderByRangePrice,
} from "../../redux/actions";
import { signout } from "../../redux/actions/userActions";
import * as FaIcons from 'react-icons/fa';

const NavBar = ({ setOrder }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const userInfo = useSelector(state => state.userInfo);

  useEffect(() => {
    dispatch(getCategories());
  }, [userInfo, dispatch]);

  function handleClick(e) {
    dispatch(getProducts());
  }

  function handleSignout() {
    firebase.auth().signOut()
    dispatch(signout());
  }

  const handleOrder = (e) => {
    dispatch(orderByPrice(e.target.value));
    setOrder(e.target.value);
  };

  const handleFilterRangePrice = (e) => {
    dispatch(orderByRangePrice(e.target.value));
    //console.log(e.target.value)
    setOrder(e.target.value);
  };


  let rangos = ["0-500", "501-1000", "1001-1500", "1501-2000", "2001-2500"];

  return (
    <nav>
      <div className={styles.container}>
        <img src={Logo} alt="logo" />
        <div className={styles.filtros}>
          <SearchBar />
          <label htmlFor="categories">Categorías</label>
          <select
            name="categories"
            className={styles.select}
            onChange={(e) => dispatch(filterByCategory(e.target.value))}
          >
            <option value="all_categories" key="0">
              Todas
            </option>
            {categories && categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            onChange={(e) => handleFilterRangePrice(e)}
          >
            <option value="all_categories" key="0">
              Todos Precios
            </option>
            {rangos.map((rango, index) => (
              <option key={index}>{rango}</option>
            ))}
          </select>
          <select className={styles.select} onChange={handleOrder}>
            <option value="all" key="0">
              Ordenar por Precio
            </option>
            <option value="price_asc" key="1">
              Menor a Mayor
            </option>
            <option value="price_desc" key="2">
              Mayor a Menor
            </option>
          </select>
        </div>
        <div className={styles.container_links}>
          <div className={styles.links}>
            <NavLink
              className={styles.link_text}
              to="/"
              onClick={(e) => handleClick(e)}
            >
              Inicio
            </NavLink>
            <NavLink className={styles.link_text} to="/about">
              Sobre Nosotros
            </NavLink>
            <NavLink className={styles.link_text} to="/shop">
              Tienda
            </NavLink>
            <NavLink className={styles.link_text} to="/help">
              Ayuda
            </NavLink>
            {userInfo 
              ? (<div className="dropdown">
                <NavLink className={styles.link_text} to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul className="dropdown-content">
                  <NavLink to="#signout" onClick={handleSignout}>
                    Sign Out
                  </NavLink>
                </ul>
              </div>)
              : (<NavLink className={styles.link_text} to="/login">
                  Logueo
                </NavLink>)
            }
          </div>
          <NavLink className={styles.link_cart} to="/cart">
            <button className={styles.boton}><span><FaIcons.FaCartPlus /></span> Tu Carrito</button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
