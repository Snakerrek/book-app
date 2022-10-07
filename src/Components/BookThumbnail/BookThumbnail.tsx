import React from "react";
import styled from "styled-components";
import { BasicBookType } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  book: BasicBookType;
};

const OuterWrapper = styled.div`
  margin: 1rem;
`;

const BookThumbnailWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColors.white};
  border-radius: 10px;
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

  & > div {
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h3 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0;
    color: ${(props) => props.theme.textColors.black};
  }
  h4 {
    color: ${(props) => props.theme.textColors.grey};
  }
`;

const BookThumbnail = ({ book }: Props) => {
  return (
    <OuterWrapper>
      <Link to={`/bookDetails/${book._id}`} style={{ textDecoration: "none" }}>
        <BookThumbnailWrapper>
          <img src={book.cover} />
          <div>
            <h3>{book.title}</h3>
          </div>
          <h4>{book.authors.join(", ")}</h4>
        </BookThumbnailWrapper>
      </Link>
    </OuterWrapper>
  );
};

export default BookThumbnail;
