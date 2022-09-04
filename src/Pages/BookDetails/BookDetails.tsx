import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../../Components/StarRating/StarRating";
import { AdvancedBookType } from "../../types";

const BookDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-right: 1rem;
`;

const BookDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1400px;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColors.white};
  padding: 1rem;
`;

const LeftColumn = styled.div`
  flex: 1 1 300px;
`;

const CenterColumn = styled.div`
  flex: 2 1 500px;
  margin: 1rem;
`;

const RightColumn = styled.div`
  flex: 1 1 275px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
`;

const BookCover = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    max-width: 400px;
    width: 100%;
    height: 100%;
  }
`;

const BookData = styled.div``;

const BookRating = styled.div``;

const BookActions = styled.div``;

const Title = styled.div``;

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<AdvancedBookType | null>(null);

  const fetchBookDetails = async (bookId: string) => {
    const bookDetJson = await fetch(`/api/books/getDetails/${id}`);
    const bookDet = await bookDetJson.json();
    setBookDetails(bookDet);
  };

  useEffect(() => {
    if (id) fetchBookDetails(id);
    // eslint-disable-next-line
  }, [id]);

  const getReadTime = (pageCountStr: string) => {
    // read speed 1page/1min
    const pageCount = parseInt(pageCountStr);
    const hours = Math.floor(pageCount / 60);
    const minutes = pageCount - hours * 60;
    return `${hours} godz. ${minutes} min.`;
  };

  return (
    <BookDetailsWrapper>
      <Title>
        <h1>{bookDetails?.title}</h1>
      </Title>
      <BookDetailsContainer>
        <LeftColumn>
          <BookCover>
            <img src={bookDetails?.cover} alt={bookDetails?.title} />
          </BookCover>
        </LeftColumn>
        <CenterColumn>
          <BookData>
            <h2>{bookDetails?.authors.join(", ")}</h2>
            <h3>{bookDetails?.categories.join(", ")}</h3>
            <div>
              <span>{bookDetails?.pageCount + "str."}</span>
              <span>
                {bookDetails?.pageCount && getReadTime(bookDetails.pageCount)}
              </span>
            </div>
            <p>ISBN: {bookDetails?.isbn}</p>
            <p>{bookDetails?.description}</p>
          </BookData>
        </CenterColumn>
        <RightColumn>
          <BookRating>
            <div>ŚREDNIA OCEN</div>
            <div>7.9 / 10</div>
            <div>
              <span>224 OPINII</span>
              <span>1122 OCEN</span>
            </div>
            <div>
              <p>OCEŃ KSIĄŻKĘ</p>
              <StarRating />
            </div>
          </BookRating>
          <BookActions></BookActions>
        </RightColumn>
      </BookDetailsContainer>
    </BookDetailsWrapper>
  );
};

export default BookDetails;
