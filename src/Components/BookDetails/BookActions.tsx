import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  UserBookDetails,
  AdvancedBookType,
  ShelfNames,
  TokenUserData,
} from "../../types";
import BasicButton from "../BasicButton/BasicButton";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";

type Props = {
  userBookDetails: UserBookDetails;
  bookDetails: AdvancedBookType;
  userData: TokenUserData | null;
  setUserBookDetails: (book: UserBookDetails) => void;
};

const BookActionsContainer = styled.div`
  & > div {
    display: flex;
  }
  & h2 {
    margin-bottom: 0;
  }
  & h4,
  h2 {
    margin-bottom: 0;
  }
`;

const ProgressInput = styled.input`
  border: 2px solid ${(props) => props.theme.colors.grey};
  border-radius: 5px;
  width: 100px;
  color: ${(props) => props.theme.textColors.lightGrey};
  font-size: ${(props) => props.theme.fontSize.S};
  min-height: 40px;
  padding: 5px;
  &:focus {
    outline: none;
  }
`;

const BookActions = (props: Props) => {
  const { id } = useParams();
  const { userBookDetails, bookDetails, userData, setUserBookDetails } = props;
  const [progressInput, setProgressInput] = useState<number>(0);

  const updateProgress = async (progress: number) => {
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

  const shelveBook = async (shelf: string) => {
    if (userData) {
      const userBookDetailsJson = await fetch("/api/shelf/shelve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: id,
          userId: userData.id,
          shelf: shelf,
        }),
      });
      const userBookDetails: { message: string; book: UserBookDetails } =
        await userBookDetailsJson.json();
      setUserBookDetails(userBookDetails.book);
    }
  };

  const getShelveButtons = (shelveItsOn?: string) => {
    const buttonTypesToDisplay = Object.keys(ShelfNames).filter(
      (key) => key !== shelveItsOn
    );
    const shouldDisplay = (shelveName: string) => {
      return buttonTypesToDisplay.includes(shelveName);
    };
    return (
      <div>
        {shouldDisplay("READ") && (
          <BasicButton
            onClick={() => shelveBook("READ")}
            text={"Przeczytane"}
            backgroundGradient={"orange"}
          />
        )}
        {shouldDisplay("CURRENTLY_READING") && (
          <BasicButton
            onClick={() => shelveBook("CURRENTLY_READING")}
            text={"Czytam"}
            backgroundGradient={"orange"}
          />
        )}
        {shouldDisplay("WANT_TO_READ") && (
          <BasicButton
            onClick={() => shelveBook("WANT_TO_READ")}
            text={"Chcę przeczytać"}
            backgroundGradient={"orange"}
          />
        )}
      </div>
    );
  };

  return (
    <BookActionsContainer>
      {userBookDetails?.shelf ? (
        <>
          <h2>Półka:</h2>
          <h3>
            *{ShelfNames[userBookDetails.shelf as keyof typeof ShelfNames]}*
          </h3>
          <h2> Zmień półkę </h2>
        </>
      ) : (
        <h2> Dodaj na półkę </h2>
      )}
      {getShelveButtons(userBookDetails?.shelf)}
      {bookDetails?.pageCount && (
        <>
          {userBookDetails?.shelf !== "WANT_TO_READ" && (
            <>
              <h4>Progres:</h4>
              {userBookDetails?.progress !== undefined && (
                <ProgressBar
                  done={userBookDetails?.progress}
                  max={parseInt(bookDetails?.pageCount)}
                />
              )}
              {userBookDetails?.shelf !== "READ" && (
                <>
                  <ProgressInput
                    type={"number"}
                    onChange={(e) => setProgressInput(parseInt(e.target.value))}
                    placeholder={"0"}
                  />
                  <BasicButton
                    onClick={() => updateProgress(progressInput)}
                    text="Zaaktualizuj progres"
                    big
                    backgroundGradient={"blue"}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </BookActionsContainer>
  );
};

export default BookActions;
