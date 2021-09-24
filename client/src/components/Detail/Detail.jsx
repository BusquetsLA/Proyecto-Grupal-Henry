import React, { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getProductsById, updateUserCart } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import BeatLoader from "react-spinners/BeatLoader";
import detStyle from "./Detail.module.css";
import ReactImageZoom from "react-image-zoom";
import ReactStars from "react-stars";


export default function Detail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

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

  const handleAddProduct = () => {
    if (userInfo && !cart.productsList.length) {
      productDetail.quantity = 1;
      updateUserCart(userInfo._id, cart.productsList).then(() => {
        setCart({
          ...cart,
          productsList: [...cart.productsList, productDetail],
        });
        return history.push("/cart");
      });
    } else if (
      productDetail &&
      !cart.productsList.find((elem) => elem._id === productDetail._id)
    ) {
      productDetail.quantity = 1;
      setCart({
        ...cart,
        productsList: [...cart.productsList, productDetail],
      });
      history.push("/cart");
    }
  };

  const valorReview = {
    size: 25,
    value: 4,
    edit: false,
  };

  const props = {
    width: 400,
    height: 400,
    zoomWidth: 500,
    img: productDetail.image_url,
  };

  return (
    <div>
      <NavBar />
      <div className={detStyle.padre}>
        {Object.keys(productDetail).length &&
        productDetail._id === productId ? (
          <div className={detStyle.content}>
            <div className={detStyle.info1}>
              {/* <img id="zoom_mw" src={productDetail.image_url} alt="product" data-zoom-image={productDetail.image_url}/> */}
              <ReactImageZoom {...props} />
            </div>
            <div className={detStyle.info2}>
              <div className={detStyle.data1}>{productDetail.name}</div>
              <ReactStars {...valorReview} />
              <div className={detStyle.data3}>$ {productDetail.price}</div>
              <div className={detStyle.data4}>
                <b>Descripción del producto: </b>
                <br />
                {productDetail.description}
              </div>
              <div className={detStyle.data5}>
                {!productDetail.stock || productDetail.stock === 0 ? (
                  <p>No hay unidades disponibles de este producto</p>
                ) : (
                  <button
                    className={detStyle.button1}
                    onClick={() => handleAddProduct()}
                  >
                    {" "}
                    Agregar al carrito 🛒{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <BeatLoader />
        )}
      </div>
    </div>
  );
}
