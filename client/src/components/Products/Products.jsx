import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import Product from "../Product/Product";
import prodsStyle from "./Products.module.css";
import Footer from "../Footer/Footer";
import Notfound from "../Detail/Nofound";
import Pagination from "../Pagination/Pagination";
// import Typography from '@mui/material/Typography';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

const Products = () => {
  var showData = [];
  var productsArr = useSelector((state) => state.products.all);
  var searchArr = useSelector((state) => state.products.searchResults);
  var filtered = useSelector((state) => state.products.filtered);
  var dataState = useSelector((state) => state.dataState);
  
  
    if (dataState === "all") showData = productsArr;
    else if (dataState === "search") showData = searchArr;
    else if (dataState === "filter") showData = filtered;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productsPerPage; // 1*9=9 2*9=18 3*9=27 4*9=36 5*9=45...
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 9-9=0 18-9=9 27-9=18 36-9=27 45-9=36...
  const currentProducts = showData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
 

  // const [page, setPage] = React.useState(1);
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className={prodsStyle.title1}>Catalogo de Productos</div>
        {currentProducts.length === 0 ? (
        <div>
          <Notfound />
        </div>
      ) : (
        <div className={prodsStyle.contenedor}>
            {currentProducts.map((e) => (
        <Product
          key={e._id}
          id={e._id}
          image={e.image_url}
          name={e.name}
          price={e.price}
          catArr={e.categories}
            />
            ))}
        </div>
      )}
      <Pagination
        productsPerPage={productsPerPage}
        allProducts={showData.length}
        paginate={paginado}
      />
      <Footer />
    </>
  );
};

export default Products;



