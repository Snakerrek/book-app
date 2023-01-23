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

const StarRating = ({
  onStarRate,
  initialStarValue,
}: {
  onStarRate: (starRate: number) => void;
  initialStarValue: number;
}) => {
  const [rating, setRating] = useState<number>(initialStarValue);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  useEffect(() => {
    setRating(initialStarValue);
  }, [initialStarValue]);

  return (
    <StarRatingWrapper>
      {[...Array(10)].map((_, index) => {
        const ratingVal = index + 1;
        return (
          <label key={`star-${index}`}>
            <input
              type="radio"
              name="rating"
              value={ratingVal}
              onClick={() => {
                onStarRate(ratingVal);
                setRating(ratingVal);
              }}
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
