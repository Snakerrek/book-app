import React from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRatingWrapper = styled.div`
  input[type="radio"] {
    display: none;
  }

  svg {
    cursor: pointer;
  }
`;

const StarRatingDisplay = ({ rating }: { rating: number }) => {
  return (
    <StarRatingWrapper>
      {[...Array(10)].map((_, index) => {
        const ratingVal = index + 1;
        return (
          <label key={`star-${index}`}>
            <input type="radio" name="rating" value={ratingVal} />
            <FaStar
              size={25}
              color={ratingVal <= rating ? "#ffd700" : "#464A53"}
            />
          </label>
        );
      })}
    </StarRatingWrapper>
  );
};

export default StarRatingDisplay;
