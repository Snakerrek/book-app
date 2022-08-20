import React from "react";
import styled from "styled-components";
import { BookType } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  book: BookType;
};

const BookThumbnailWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColors.white};
  border-radius: 10px;
  margin: 1rem;
  max-width: 250px;
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    max-width: 100%;
  }
  h3 {
    margin-bottom: 0;
    color: ${(props) => props.theme.textColors.black};
  }
  h4 {
    color: ${(props) => props.theme.textColors.grey};
  }
`;

const BookThumbnail = ({ book }: Props) => {
  return (
    <Link to={`/bookDetails/${book._id}`} style={{ textDecoration: "none" }}>
      <BookThumbnailWrapper>
        <img src={book.cover} />
        <h3>{book.title}</h3>
        <h4>{book.authors.join(", ")}</h4>
      </BookThumbnailWrapper>
    </Link>
  );
};

export default BookThumbnail;
