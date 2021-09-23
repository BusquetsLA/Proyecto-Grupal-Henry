import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ productsPerPage, allProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination_nav}>
      <ul> 
        {pageNumbers &&
          pageNumbers.map((num, idx) => (
            <li key={idx}>
              <button onClick={() => paginate(num)}>{num}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
