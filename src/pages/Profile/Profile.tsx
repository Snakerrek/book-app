import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getUserData } from "../../helpers";
import { Shelf, UserBookDetails, UserData } from "../../types";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const userDataToken = getUserData();
    const userDataJson = await fetch(`/api/user/get/${userDataToken?.id}`);
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

  const redirectToBookDetails = (bookId: string) => {
    if (bookId) {
      navigate(`/bookDetails/${bookId}`);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ProfileWrapper>
      <div>
        <h2>Profile data:</h2>
        <p>Username: {userData?.username}</p>
        <p>Email: {userData?.email}</p>
        <p>Avatar: {userData?.avatar}</p>
      </div>
      <div>
        <h2>Book shelves:</h2>
        {shelves.map((shelf) => (
          <div key={shelf.name}>
            <h3>{shelf.name}</h3>
            <ul>
              {shelf.books.map((book) => (
                <div
                  key={book.bookId}
                  onClick={() => redirectToBookDetails(book.bookId)}
                >
                  <li key={book.bookId}>{book.bookDetails?.title}</li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
