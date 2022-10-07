import React from "react";
import { Review } from "../../types";

type Props = {
  review: Review;
};

const ReviewCard = (props: Props) => {
  return (
    <>
      {props.review.review && (
        <div>
          <h3>ReviewCard</h3>
          <p>Autor recenzji: {props.review.authorID}</p>
          <p>Ilość gwiazdek: {props.review.starRating}</p>
          <p>{props.review.review}</p>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
