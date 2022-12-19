import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Shelf, ShelfNames, UserBookDetails } from "../../types";
import SmallCoverPlaceholder from "../BookCoverPlaceholder/SmallCoverPlaceholder";
type Props = {
  shelfData: Shelf;
  onBookClick?: (bookId?: string) => void;
};

const ShelfContainer = styled.div`
  border-bottom: 30px solid #a5a5a5;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 25px;

  h3 {
    position: absolute;
    top: 110px;
    left: 25px;
  }

  img {
    width: auto;
    height: 125px;
    margin: 0 0 0 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    :hover {
      transform: scale(1.05);
    }
  }

  &:after {
    content: "";
    background: #686868;
    height: 20px;
    width: calc(100% + 40px); /*IE9+*/
    position: absolute;
    top: 154px;
    left: 0;
    right: 0;
    z-index: 1;
    margin: 0 -20px;
  }
`;

const ShelfComp = (props: Props) => {
  const { shelfData, onBookClick } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [books, setBooks] = useState<UserBookDetails[]>([]);

  useLayoutEffect(() => {
    if (ref.current && ref.current.offsetWidth !== 0) {
      const numberOfBooksToDisplay = Math.floor(ref.current.offsetWidth / 100);
      setBooks(shelfData.books.slice(0, numberOfBooksToDisplay).reverse());
    }
    //eslint-disable-next-line
  }, []);

  return (
    <ShelfContainer ref={ref}>
      <h3>{ShelfNames[shelfData.name as keyof typeof ShelfNames]}</h3>
      {books.map((book) => {
        if (book.bookDetails?.cover) {
          return (
            <img
              src={book.bookDetails?.cover}
              alt={`${book.bookDetails?.title} cover`}
              onClick={() => onBookClick && onBookClick(book?.bookDetails?._id)}
              key={book.bookDetails?._id}
            />
          );
        } else {
          return (
            <SmallCoverPlaceholder
              onClick={() => onBookClick && onBookClick(book?.bookDetails?._id)}
              key={book.bookDetails?._id}
            >
              <p>{book?.bookDetails?.title}</p>
              <br />
              <p>{book?.bookDetails?.authors?.join(", ")}</p>
            </SmallCoverPlaceholder>
          );
        }
      })}
    </ShelfContainer>
  );
};

export default ShelfComp;
