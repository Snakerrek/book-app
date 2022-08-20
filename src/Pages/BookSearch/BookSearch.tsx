import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookThumbnail from "../../Components/BookThumbnail/BookThumbnail";
import { BasicBookType } from "../../types";

const BookSearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 1rem;
`;

const BookSearch = () => {
  const { searchPhrase } = useParams();
  const [books, setBooks] = useState<BasicBookType[] | null>(null);

  const fetchBooks = async (searchPhrase: string) => {
    const jsonBooks = await fetch(`/api/books/searchBooks/${searchPhrase}`);
    const books: BasicBookType[] = await jsonBooks.json();
    setBooks(books);
  };

  useEffect(() => {
    if (searchPhrase) fetchBooks(searchPhrase);
  }, [searchPhrase]);

  return (
    <BookSearchWrapper>
      {books &&
        books.map((book, index) => (
          <BookThumbnail book={book} key={`bookThumbnail-${index}`} />
        ))}
    </BookSearchWrapper>
  );
};

export default BookSearch;
