import React from "react";
import { ShelfNames, UserBookDetails } from "../../types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getGenreLabelsByValue } from "../../configService";

const BookTableWrapper = styled.div`
  overflow-x: scroll;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  margin: 15px;
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  border-radius: 5px;

  img {
    width: 50px;
    height: auto;
  }
  tbody {
    tr {
      cursor: pointer;
      transition: 0.2s ease-in-out;
      :hover {
        box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
      }

      h3,
      p {
        max-width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  td {
    padding: 5px 10px;
  }
  td:nth-child(odd),
  th:nth-child(odd) {
    background-color: ${(props) => props.theme.backgroundColors.greyish};
  }

  th {
    text-align: left;
    padding: 10px;
  }
`;

const SmallCoverPlaceholder = styled.div`
  height: 65px;
  width: 50px;
  background-image: url("/images/bookPlaceholder.png");
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  padding: 10px;
`;

type Props = { books: UserBookDetails[] };

const BookTable = ({ books }: Props) => {
  const navigate = useNavigate();

  const redirectToBookData = (bookId?: string) => {
    if (bookId) {
      navigate(`/bookDetails/${bookId}`);
    }
  };

  const getPercentageProgress = (progress?: number, pageCount?: string) => {
    if (progress && pageCount && pageCount !== "0") {
      return Math.floor((progress / parseInt(pageCount)) * 100) + "%";
    } else {
      return "0%";
    }
  };

  return (
    <BookTableWrapper>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Tytuł</th>
            <th>Autor / Autorzy</th>
            <th>Półka</th>
            <th>Progres</th>
            <th>Strony</th>
            <th>Gatunek</th>
            <th>ISBN</th>
            <th>Wydawnictwo</th>
            <th>Data wydania</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.bookDetails?._id}
              onClick={() => redirectToBookData(book.bookDetails?._id)}
            >
              <td>
                {book.bookDetails?.cover ? (
                  <img src={book.bookDetails?.cover} alt="bookCover" />
                ) : (
                  <SmallCoverPlaceholder />
                )}
              </td>
              <td>
                <div>
                  <h3>{book.bookDetails?.title}</h3>
                </div>
              </td>
              <td>
                <p>{book.bookDetails?.authors.join(",")}</p>
              </td>
              <td>{ShelfNames[book.shelf as keyof typeof ShelfNames]}</td>
              <td>
                {getPercentageProgress(
                  book.progress,
                  book.bookDetails?.pageCount
                )}
              </td>
              <td>{book.bookDetails?.pageCount || 0} str.</td>
              <td>
                {book.bookDetails?.categories && (
                  <p>
                    {getGenreLabelsByValue(book.bookDetails?.categories).join(
                      ", "
                    )}
                  </p>
                )}
              </td>
              <td>{book.bookDetails?.isbn}</td>
              <td>
                <p>{book.bookDetails?.publisher}</p>
              </td>
              <td>{book.bookDetails?.publishedDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </BookTableWrapper>
  );
};

export default BookTable;
