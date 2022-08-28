import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookThumbnail from "../../Components/BookThumbnail/BookThumbnail";
import { BasicBookType } from "../../types";
import AddBookForm from "../../Components/AddBookForm/AddBookForm";
import Modal from "../../Components/Modal/Modal";

const BookSearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 1rem;
`;

const BookSearch = () => {
  const { searchPhrase } = useParams();
  const [books, setBooks] = useState<BasicBookType[] | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      {books && books.length > 0 ? (
        books.map((book, index) => (
          <BookThumbnail book={book} key={`bookThumbnail-${index}`} />
        ))
      ) : (
        <div>
          Unfortunately there is no such book in database. Would you like to add
          it yourself?
          <button onClick={toggleModal}>Add book</button>
          {isModalOpen && (
            <Modal
              title={"Add book"}
              midContent={<AddBookForm onSubmit={toggleModal} />}
              onClose={toggleModal}
            />
          )}
        </div>
      )}
    </BookSearchWrapper>
  );
};

export default BookSearch;
