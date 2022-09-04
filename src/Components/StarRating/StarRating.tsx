import React, { useEffect, useState } from "react";
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

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  useEffect(() => {
    if (rating !== 0) {
      //TODO rate request
      console.log(`Book rated to ${rating}`);
    }
  }, [rating]);

  return (
    <StarRatingWrapper>
      {[...Array(10)].map((star, index) => {
        const ratingVal = index + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingVal}
              onClick={() => setRating(ratingVal)}
            />
            <FaStar
              size={25}
              color={
                ratingVal <= (hoveredStar || rating) ? "#ffd700" : "#464A53"
              }
              onMouseEnter={() => setHoveredStar(ratingVal)}
              onMouseLeave={() => setHoveredStar(0)}
            />
          </label>
        );
      })}
    </StarRatingWrapper>
  );
};

export default StarRating;
