import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../../Components/StarRating/StarRating";
import ReviewSection from "../../Components/BookDetails/ReviewSection";
import { AdvancedBookType, ShelfNames } from "../../types";
import { BsBookHalf } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { getUserData } from "../../helpers";
import { TokenUserData, ReviewData, Review } from "../../types";
import { UserBookDetails } from "../../types";
import BookCoverPlaceholder from "../../Components/BookCoverPlaceholder/BookCoverPlaceholder";
import BookActions from "../../Components/BookDetails/BookActions";
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
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

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

const BookData = styled.div`
  svg {
    margin: 0 0.25rem;
    font-size: 1.5rem;
  }
  p {
    text-align: justify;
  }
`;

const BookRating = styled.div`
  div {
    margin: 0.25rem 0;
  }
  span {
    margin: 0 0.25rem;
  }
`;

const Title = styled.div``;

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<AdvancedBookType | null>(null);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [userBookDetails, setUserBookDetails] =
    useState<UserBookDetails | null>(null);
  const [userData, setUserData] = useState<TokenUserData | null>(getUserData());

  const fetchUserBookDetails = async () => {
    const userData: TokenUserData | null = await getUserData();
    if (userData) {
      const userBookDetailsJson: Response = await fetch(
        "/api/shelf/getUserBookData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userData.id, bookId: id }),
        }
      );
      const userBookDetails: UserBookDetails = await userBookDetailsJson.json();
      setUserBookDetails(userBookDetails);
    }
  };

  const evalReviewData = () => {
    const reviews = bookDetails?.reviews;
    let starsSum = 0;
    let starsNumber = 0;
    let reviewsNumber = 0;
    let thisUserReview: Review | null = null;
    if (reviews) {
      reviews.forEach((review) => {
        if (userData && userData.id === review.author.authorID) {
          thisUserReview = review;
        }
        if (review.review && review.review !== "") {
          reviewsNumber += 1;
        }
        if (review.starRating) {
          starsNumber += 1;
          starsSum += parseInt(review.starRating);
        }
      });
    }
    setReviewData({
      starRatingAvg: starsNumber > 0 ? starsSum / starsNumber : 0,
      starRatingsCount: starsNumber,
      reviewsCount: reviewsNumber,
      thisUserReview: thisUserReview || undefined,
    });
  };

  const fetchBookDetails = async () => {
    const bookDetJson = await fetch(`/api/books/getDetails/${id}`);
    const bookDet = await bookDetJson.json();
    setBookDetails(bookDet);
  };

  const onStarRate = async (rating: number) => {
    const reqBody = {
      bookID: bookDetails?._id,
      authorID: userData?.id,
      starRating: rating,
    };
    const updatedBookJson = await fetch("/api/books/rateBook", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const updatedBook = await updatedBookJson.json();
    setBookDetails(updatedBook.updatedBook);
  };

  const onSubmitReview = async (userReview?: string) => {
    if (userReview) {
      const reqBody = {
        bookID: bookDetails?._id,
        authorID: userData?.id,
        reviewText: userReview,
      };

      const updatedBookJson = await fetch("/api/books/rateBook", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const updatedBook = await updatedBookJson.json();
      setBookDetails(updatedBook.updatedBook);
    }
  };

  const updateProgress = async (progress: number) => {
    const userData: TokenUserData | null = getUserData();
    if (
      userData &&
      bookDetails?.pageCount &&
      progress <= parseInt(bookDetails?.pageCount) &&
      progress >= 0
    ) {
      const reqBody = {
        bookId: bookDetails?._id,
        userId: userData.id,
        progress: progress,
      };
      const resJson: Response = await fetch("/api/shelf/updateProgress", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const res = await resJson.json();
      if (!!res.book) {
        setUserBookDetails(res.book);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookDetails();
      fetchUserBookDetails();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    evalReviewData();
  }, [bookDetails?.reviews]);

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
            {bookDetails?.cover ? (
              <img src={bookDetails?.cover} alt={bookDetails?.title} />
            ) : (
              <BookCoverPlaceholder
                title={bookDetails?.title}
                authors={bookDetails?.authors}
              />
            )}
          </BookCover>
        </LeftColumn>
        <CenterColumn>
          <BookData>
            <h2>{bookDetails?.authors.join(", ")}</h2>
            <h3>{bookDetails?.categories.join(", ")}</h3>
            {bookDetails?.pageCount && (
              <div>
                <BsBookHalf />
                <span>{bookDetails?.pageCount + "str."}</span>
                <BiTimeFive />
                <span>
                  {bookDetails?.pageCount && getReadTime(bookDetails.pageCount)}
                </span>
              </div>
            )}
            <p>ISBN: {bookDetails?.isbn}</p>
            <p>Wydawnictwo: {bookDetails?.publisher}</p>
            <p>Data wydania: {bookDetails?.publishedDate}</p>
            <p>{bookDetails?.description}</p>
          </BookData>
        </CenterColumn>
        <RightColumn>
          <BookRating>
            <div>ŚREDNIA OCEN</div>
            <div>{reviewData?.starRatingAvg} / 10</div>
            <div>
              <span>{reviewData?.starRatingsCount} OCEN</span>
              <span>-</span>
              <span>{reviewData?.reviewsCount} OPINII</span>
            </div>
            <div>
              <p>
                {reviewData?.thisUserReview?.starRating
                  ? "TWOJA OCENA"
                  : "OCEŃ KSIĄŻKĘ"}
              </p>
              {reviewData?.thisUserReview?.starRating ? (
                <StarRating
                  onStarRate={onStarRate}
                  initialStarValue={parseInt(
                    reviewData?.thisUserReview?.starRating
                  )}
                />
              ) : (
                <StarRating onStarRate={onStarRate} initialStarValue={0} />
              )}
            </div>
          </BookRating>
          {bookDetails && userBookDetails && (
            <BookActions
              bookDetails={bookDetails}
              userBookDetails={userBookDetails}
              userData={userData}
              setUserBookDetails={setUserBookDetails}
            />
          )}
        </RightColumn>
      </BookDetailsContainer>
      <ReviewSection
        reviews={bookDetails?.reviews ? bookDetails.reviews : []}
        bookId={bookDetails?._id}
        onSubmitReview={onSubmitReview}
      />
    </BookDetailsWrapper>
  );
};

export default BookDetails;
