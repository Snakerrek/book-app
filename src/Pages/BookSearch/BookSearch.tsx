import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookThumbnail from "../../Components/BookThumbnail/BookThumbnail";
import { BookType } from "../../types";

const BookSearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 1rem;
`;

const BookSearch = () => {
  const { searchPhrase } = useParams();
  const [books, setBooks] = useState<BookType[] | null>(null);

  const fetchBooks = async () => {
    const jsonBooks = await fetch(`/api/books/searchBooks/${searchPhrase}`);
    const books: BookType[] = await jsonBooks.json();
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
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
