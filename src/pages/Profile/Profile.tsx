import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BasicButton from "../../Components/BasicButton/BasicButton";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ShelfComp from "../../Components/Profile/ShelfComp";
import UserStats from "../../Components/Profile/UserStats";
import { getUserData } from "../../helpers";
import { Shelf, UserBookDetails, UserData } from "../../types";

const Title = styled.div`
  text-align: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 5rem;
`;

const ShelvesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 2rem;
  max-width: 1000px;
`;

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  const userDataToken = getUserData();

  const fetchUserData = async () => {
    const userDataJson = await fetch(
      `/api/user/get/${userId ? userId : userDataToken?.id}`
    );
    const userData = await userDataJson.json();
    setUserData(userData);
    generateShelves(userData.books);
  };

  const generateShelves = (books: UserBookDetails[]) => {
    const shelves = books.reduce((acc: Shelf[], book: UserBookDetails) => {
      const shelf = acc.find((shelf) => shelf.name === book.shelf);
      if (shelf) {
        shelf.books.push(book);
      } else {
        acc.push({ name: book.shelf, books: [book] });
      }
      return acc;
    }, []);
    setShelves(shelves);
  };

  const redirectToBookDetails = (bookId?: string) => {
    if (bookId) {
      navigate(`/bookDetails/${bookId}`);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LoadingOverlay />
      <Title>
        <h1> Profil </h1>
      </Title>
      <ProfileWrapper>
        {userData && <ProfileCard userData={userData} />}
        <UserStats />
        <ShelvesWrapper>
          {shelves.map((shelf) => (
            <ShelfComp
              shelfData={shelf}
              key={shelf.name}
              onBookClick={redirectToBookDetails}
            />
          ))}
        </ShelvesWrapper>
        <BasicButton
          onClick={() =>
            navigate(`/bookList/${userId ? userId : userDataToken?.id}`)
          }
          text={"Wszystkie książki"}
          big
          backgroundGradient="orange"
          fullLine
        />
      </ProfileWrapper>
    </>
  );
};

export default Profile;
