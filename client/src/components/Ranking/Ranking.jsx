import React from "react";
import ReactStars from "react-stars";
// import "./styles.css";

const Ranking = ({setStars}) => {

  const editReview = {
    size: 30,
    count: 5,
    color: "black",
    activeColor: "red",
    value: 3,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      //console.log(`Example 2: new value is ${newValue}`);
      setStars(newValue)
    }
  };

    return (
    <div>
 <ReactStars {...editReview} />
    </div>
  );
};

export default Ranking;
