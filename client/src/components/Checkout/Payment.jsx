import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { Snackbar } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_Dt4ZBItXSZT1EzmOd8yCxonL');

const Payment = ({
  
  user,
  checkoutData,
  handleBackStep,
  handleNextStep,
  handleCheckout,
}) => {
  const Cart = useSelector((state) => state.cart);
  const handleSubmit = async (e, elements, stripe) => {
  

    e.preventDefault();                              
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card:elements.getElement(CardElement)
    })
     
    if(error.code==='incomplete_number'){
      console.log('numero incompleto o tarjeta invalida')
      // <Alert severity="error">
      // <AlertTitle>Error</AlertTitle>
      // <strong>Datos incompletos o tarjeta invalida</strong>
      // </Alert>
    }

    // console.log(error,paymentMethod)
    // if(!error){
    //   const {id} = paymentMethod;
    // }
    // if (!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    // if (error) {
    //   console.log("Error ======>>>>", error);
    // } else {
    //   const orderData = {
    //     payment: {
    //       gateway: "stripe",
    //       stripe: {
    //         payment_method_id: paymentMethod.id,
    //       },
    //     },
    //     shipping: {
    //       name: "stander",
    //       street: user.address,
    //       town_city: user.city,
    //       county_state: user.shippingSubdivision,
    //       postal_zip_code: user.postcode,
    //       country: user.shippingCountry,
    //     },
    //     customer: {
    //       firstname: user.firstName,
    //       lastname: user.lastName,
    //       email: user.email,
    //     },
    //     line_items: checkoutData.live.line_items,
    //     fulfillment: { shipping_method: user.shippingOptions },
    //   };

    //   handleCheckout(checkoutData.id, orderData);
      handleNextStep(e, "confirmation");
    //}
  };


const [datos,setDatos] = useState('')

 useEffect(()=>{
 axios.get('http://localhost:3001/mercadopago')
 .then((data)=>{
    setDatos(data.data)
    console.info('Contenido de data', data)
 })
 .catch(err => console.error(err))


 },[])
 
 
useEffect(()=>{
  const script = document.createElement('script');

  const attr_data_preference = document.createAttribute('data-preference-id')//crea un nodo atributo
  attr_data_preference.value = datos.id //le asigna como valor el id que devuelve MP

  //Agrega atributos al elemento script
  script.src="https://www.mercadopago.com.ar/integratios/v1/web-payment-checkout.js";
  script.setAttribute(attr_data_preference)

  console.log(datos)

  //Agrega el script como nodo hijo del elemento form
  document.getElementById('form1').appendChild(script)
  return ()=>{
    //Elimina el script como nodo hijo del elemento form
    document.getElementById('form1').removeChild(script)
  }

},[datos])



  return (
    <>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
        
          {({ elements, stripe }) => (
            <form id='form1' onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement></CardElement>
              <div className="actions payment-actions">
              
                <Button
                  variant="outlined"
                  onClick={(e) => handleBackStep(e, "order-details")}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  // disabled={!stripe}
                  color="primary"
                >
                    
                   Pay ${Cart.totalPrice}
                </Button>
                
                
               
              </div>
              
            </form>
           )
          }
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default Payment;
