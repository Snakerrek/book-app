import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Review } from "../../types";

type Props = {
  review: Review;
};

const ReviewCard = (props: Props) => {
  const [authorData, setAuthorData] = useState();
  const { review } = props;
  const navigate = useNavigate();

  const redirectToUserProfile = (userId: string) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <>
      {props.review.review && (
        <div>
          <h3>ReviewCard</h3>
          <p onClick={() => redirectToUserProfile(review.author.authorID)}>
            Autor recenzji: {review.author.authorName}
          </p>
          <p>Ilość gwiazdek: {review.starRating}</p>
          <p>{props.review.review}</p>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
