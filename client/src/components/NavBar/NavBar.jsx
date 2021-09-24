import React, { useEffect } from "react";
import SearchBar            from "../SearchBar/SearchBar";
import styles               from "./NavBar.module.css";
import { NavLink, Link }          from "react-router-dom";
import Logo                 from "../../media/LogoEstiloPropio.png";
import firebase             from "firebase";
import { signout }          from "../../redux/actions/userActions";
import { passwordForgot }          from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from 'react-icons/fa';
import { BiUserCircle,BiHelpCircle } from "react-icons/bi";
import { BsHouseDoorFill } from "react-icons/bs";
import { FcAssistant } from "react-icons/fc";

import {
  getCategories,
  getProducts,
  filterByCategory,
  orderByPrice,
  orderByRangePrice,
} from "../../redux/actions";

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
            ><BsHouseDoorFill size="1.8em" /></NavLink>
          {/* 
            <NavLink className={styles.link_text} to="/shop">
              Tienda
            </NavLink>
             */}
            <NavLink className={styles.link_text} to="/about">
              <BiHelpCircle size="1.9em" /> 
            </NavLink>
            <NavLink className={styles.link_text} to="/help">
              <FcAssistant size="1.9em" alt="Ayuda"/>
            </NavLink>
            {userInfo 
              ? (<div className="dropdown">
                <Link className={styles.link_text} to="#">
                  <BiUserCircle size="1.9em" alt="Usuario"/>
                </Link>
                <ul className="dropdown-content">
                  {userInfo.name}<br/>
                  {/* <Link  to="/user/reset" onClick={() => dispatch(passwordForgot('sjafs.83@gmail.com'))}>
                      Cambiar Contraseña 
                    </Link> */}
                  <br/>
                  <Link className={styles.link_text} to="/admin/userpanel/orders">
                  Ordenes <i className="fa fa-caret-down"></i>
                </Link><br/>
                  <Link to="/shop" onClick={handleSignout}>
                    &#187; Sign Out &#171;
                  </Link>
                </ul>
               
              </div>)
              : (<NavLink className={styles.link_text} to="/login">
                <BiUserCircle size="1.9em" alt="Usuario"/>
                </NavLink>)
            }
          </div>
          <NavLink className={styles.link_cart} to="/cart">

            <button className={styles.boton}><span><FaIcons.FaCartPlus/></span>Carrito</button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
