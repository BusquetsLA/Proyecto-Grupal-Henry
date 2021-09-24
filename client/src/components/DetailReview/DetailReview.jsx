import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getProductsById} from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import BeatLoader from "react-spinners/BeatLoader";
import detStyle from "./DetailReview.module.css";

import Ranking from "../Ranking/Ranking";
import { NavLink } from "react-router-dom";
import { Button }  from '@material-ui/core';
import { BiSave }  from "react-icons/bi";
import swal        from 'sweetalert';
import { postReview, getReviews } from '../../redux/actions/'

const DetailReview = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history  = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const productDetail = useSelector((state) => state.productDetails);
  var reviewsArr = useSelector((state) => state.reviews);
  const productId = location.pathname.split("/").pop();


  const[stars, setStars] = useState(0)
	const [input, setInput] = useState({
		description: '',
	});

  useEffect(() => {
    dispatch(getProductsById(productId));
    dispatch(getReviews());
  }, [dispatch, productId]);

  reviewsArr = reviewsArr.filter(rp => rp.product_id === productId)
  reviewsArr = reviewsArr.filter(rp => rp.user_id === userInfo._id)
  //console.log('review filtrado: ',reviewsArr && reviewsArr)


	function handleChange(e) {
		//console.log(e.target.value)
		setInput({
			...input,
			[e.target.name]:e.target.value
		})
	}


 async function handleSubmit(e){
  e.preventDefault();
  input.title='Review';
  input.calification=stars;
  input.product_id=productId;
  input.user_id=userInfo._id;

  console.log(input)
  let message = await dispatch(postReview(input));
  console.log(message)
  if(message?.payload.type === "success"){
    swal({
      title:'Resultado',
      text: message.payload.message,
      icon: 'success',
      button: "Ok"
    })
    .then(respuesta => {
      if(respuesta) history.push('/shop');
    })
  }

 }


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
              {reviewsArr.length>0 ? (
                <>
                  Ya se registro Review para este Producto
                </>
              ) : (
                <>
                      <Ranking setStars={setStars} />
                      <br />
                      <form onSubmit={(e) => {handleSubmit(e); }} >
                      <textarea
                        name="description"
                        id=""
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                        placeholder="Dejanos tu Experiencia con el Producto"
                      ></textarea>
                      <br />
                      <Button 
                        variant="contained" 
                        className={detStyle.btnSave}
                        type="submit"
                        disableElevation>
                        <BiSave size="1.3em" />&nbsp;Guardar</Button>
                      </form>
                  
                </>
              )
              }
                
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
