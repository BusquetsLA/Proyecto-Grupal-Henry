import React, { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getProductsById} from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import BeatLoader from "react-spinners/BeatLoader";
import detStyle from "./DetailReview.module.css";

import Ranking from "../Ranking/Ranking";
import { NavLink } from "react-router-dom";

const DetailReview = () => {
  const dispatch = useDispatch();
  const location = useLocation();


  const userInfo = useSelector((state) => state.userInfo);
  const productDetail = useSelector((state) => state.productDetails);
  const productId = location.pathname.split("/").pop();

  const [cart, setCart] = useLocalStorage("cart", {
    productsList: [],
    totalPrice: 0,
  });

  useEffect(() => {
    dispatch(getProductsById(productId));
  }, [dispatch, productId]);

 
  return (
    <div>
      <NavBar />
      <div className={detStyle.padre}>
        {Object.keys(productDetail).length &&
        productDetail._id === productId ? (
          <div className={detStyle.content}>
            <div className={detStyle.info1}>
              <img src={productDetail.image_url} alt="imagen" />
            </div>
            <div className={detStyle.info2}>
              <div className={detStyle.data1}>{productDetail.name}</div>
              <Ranking />
              <br />
              <textarea
                name="review"
                id=""
                cols="30"
                rows="10"
                placeholder="Dejanos tu Experiencia con el Producto"
              ></textarea>
              <br />
              <NavLink to="/user/ordenes" ><button className={detStyle.boton}>Regresar a tus Ordenes</button></NavLink>
            </div>
          </div>
        ) : (
          <BeatLoader />
        )}
      </div>
    </div>
  );
};

export default DetailReview;
