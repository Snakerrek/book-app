import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookThumbnail from "../../Components/BookThumbnail/BookThumbnail";
import { BasicBookType } from "../../types";
import AddBookForm from "../../Components/AddBookForm/AddBookForm";
import Modal from "../../Components/Modal/Modal";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";

const BookSearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 1rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    & p {
      color: ${(props) => props.theme.textColors.grey};
      font-size: ${(props) => props.theme.fontSize.M};
    }
  }
`;

const Button = styled.button`
  width: 150px;
  padding: 15px 30px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.M};
  color: ${(props) => props.theme.textColors.white};
  border: none;
  background: ${(props) => props.theme.colors.purple};
  border-radius: 0.25rem;
  cursor: pointer;
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

  const fetchAllBooks = async () => {
    const jsonBooks = await fetch(`/api/books/getAllBooks`);
    const books: BasicBookType[] = await jsonBooks.json();
    setBooks(books);
  };

  useEffect(() => {
    console.log(searchPhrase);
    if (searchPhrase) {
      fetchBooks(searchPhrase);
    } else {
      fetchAllBooks();
    }
  }, [searchPhrase]);

  return (
    <BookSearchWrapper>
      <LoadingOverlay />
      {books && books.length > 0 ? (
        books.map((book, index) => (
          <BookThumbnail book={book} key={`bookThumbnail-${index}`} />
        ))
      ) : (
        <div>
          <p>
            Unfortunately there is no such book in database. Would you like to
            add it yourself?
          </p>
          <Button onClick={toggleModal}>Add book</Button>
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
