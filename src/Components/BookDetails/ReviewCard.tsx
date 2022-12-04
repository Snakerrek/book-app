import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAvatar } from "../../configService";
import { Review } from "../../types";
import StarRatingDisplay from "../StarRating/StarRatingDisplay";

type Props = {
  review: Review;
};

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.backgroundColors.white};
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  width: 95%;

  h3 {
    margin: 10px;
  }

  p {
    margin: 0;
  }
`;

const ReviewTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.backgroundColors.white};
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  width: 95%;
`;

const AuthorData = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

const ReviewCard = (props: Props) => {
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
        <ReviewContainer>
          <h3>Recenzja</h3>
          <AuthorData
            onClick={() => redirectToUserProfile(review.author.authorID)}
          >
            <img
              src={
                review.author.authorAvatar
                  ? review.author.authorAvatar
                  : getAvatar("default")?.url
              }
              alt={review.author.authorName + "avatar"}
            />
            <h4>{review.author.authorName}</h4>
          </AuthorData>
          {review.starRating && (
            <StarRatingDisplay rating={parseInt(review.starRating)} />
          )}
          <ReviewTextContainer>
            <p>{props.review.review}</p>
          </ReviewTextContainer>
        </ReviewContainer>
      )}
    </>
  );
};

export default ReviewCard;
