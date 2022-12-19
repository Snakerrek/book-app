import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BasicButton from "../../Components/BasicButton/BasicButton";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";
import LastActivity from "../../Components/Profile/LastActivity";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ShelfComp from "../../Components/Profile/ShelfComp";
import UserStats from "../../Components/Profile/UserStats";
import UserTable from "../../Components/Tables/UserTable";
import { getUserData } from "../../helpers";
import { Shelf, UserBookDetails, UserData } from "../../types";

const Title = styled.div`
  text-align: center;
`;

const UserTableContainer = styled.div`
  display: flex;
  justify-content: center;
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
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  const userDataToken = getUserData();
  const [displayFollowers, setDisplayFollowers] = useState(false);
  const [displayFollowing, setDisplayFollowing] = useState(false);

  const fetchUserData = async () => {
    const userDataJson = await fetch(
      `/api/user/get/${userId ? userId : userDataToken?.id}`
    );
    const userData = await userDataJson.json();
    setUserData(userData);
    generateShelves(userData.books);
  };

  const fetchAllUsers = async () => {
    const usersJson = await fetch("/api/user/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await usersJson.json();
    setAllUsers(users);
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

  const getFollowers = () => {
    const followers: UserData[] = [];
    if (userData) {
      allUsers.forEach((user) => {
        userData.followers.forEach((follower) => {
          if (follower._id === user._id) {
            followers.push(user);
          }
        });
      });
    }
    return followers;
  };

  const getFollowing = () => {
    const following: UserData[] = [];
    if (userData) {
      allUsers.forEach((user) => {
        userData.following.forEach((followed) => {
          if (followed._id === user._id) {
            following.push(user);
          }
        });
      });
    }
    return following;
  };

  useEffect(() => {
    fetchUserData();
    fetchAllUsers();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [userId]);

  return (
    <>
      <LoadingOverlay />
      <Title>
        <h1> {!displayFollowers && !displayFollowing && "Profil"}</h1>
        {displayFollowers && (
          <h1>Obserwujący użytkownika {userData?.username}</h1>
        )}
        {displayFollowing && (
          <h1>Obserwowani użytkownika {userData?.username}</h1>
        )}
      </Title>
      {!displayFollowers && !displayFollowing && (
        <ProfileWrapper>
          {userData && (
            <ProfileCard
              userData={userData}
              onOpenFollowing={(open: boolean) => setDisplayFollowing(open)}
              onOpenFollowers={(open: boolean) => setDisplayFollowers(open)}
              onUserDataChange={(updatedUser: UserData) =>
                setUserData(updatedUser)
              }
            />
          )}
          {userData && <UserStats userData={userData} />}
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
      )}
      {displayFollowers ||
        (displayFollowing && (
          <BasicButton
            onClick={() => {
              setDisplayFollowers(false);
              setDisplayFollowing(false);
            }}
            text={"Wróć"}
            backgroundGradient="orange"
          />
        ))}
      {userData && <LastActivity userData={userData} />}
      <UserTableContainer>
        {displayFollowers && (
          <UserTable
            users={getFollowers()}
            onRedirect={() => {
              setDisplayFollowers(false);
              setDisplayFollowing(false);
            }}
          />
        )}
        {displayFollowing && (
          <UserTable
            users={getFollowing()}
            onRedirect={() => {
              setDisplayFollowers(false);
              setDisplayFollowing(false);
            }}
          />
        )}
      </UserTableContainer>
    </>
  );
};

export default Profile;
