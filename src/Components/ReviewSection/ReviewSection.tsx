import React, { useEffect, useState } from "react";
import { Review, TokenUserData } from "../../types";
import styled from "styled-components";
import Form from "../Form/Form";
import TextArea from "../Form/TextArea";
import FormSubmitButton from "../Form/FormSubmitButton";
import ReviewCard from "../ReviewCard/ReviewCard";
import { getUserData } from "../../helpers";

const ReviewSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-right: 1rem;
  width: 100%;
`;

const ReviewSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1400px;
  width: min(800px, 90vw);
  background-color: ${(props) => props.theme.backgroundColors.white};
  padding: 1rem;
  & form {
    width: 100%;
  }
`;

type Props = {
  reviews?: Review[];
  bookId?: string;
  onSubmitReview?: (userReview?: string) => void;
};

const ReviewSection = (props: Props) => {
  const [userReview, setUserReview] = useState<string>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmitReview) props.onSubmitReview(userReview);
    setUserReview("");
  };

  return (
    <ReviewSectionWrapper>
      <h2>Recenzje</h2>
      <ReviewSectionContainer>
        <Form onSubmit={onSubmit}>
          <TextArea
            placeholder="Napisz recenzję..."
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          />
          <FormSubmitButton>Dodaj recenzję</FormSubmitButton>
        </Form>
        {props.reviews?.map((review, id) => (
          <ReviewCard key={"reviewCard-" + id} review={review} />
        ))}
      </ReviewSectionContainer>
    </ReviewSectionWrapper>
  );
};

export default ReviewSection;
