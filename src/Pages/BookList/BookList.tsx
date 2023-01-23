import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";
import BookTable from "../../Components/Tables/BookTable";
import { getUserData } from "../../helpers";
import { UserData } from "../../types";

const BookListWrapper = styled.div`
  @media (min-width: 676px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BookList = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    const userDataToken = getUserData();
    const userDataJson = await fetch(
      `/api/user/get/${userId ? userId : userDataToken?.id}`
    );
    const userData = await userDataJson.json();
    setUserData(userData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <BookListWrapper>
      <LoadingOverlay />
      {userData?.books && <BookTable books={userData?.books} />}
    </BookListWrapper>
  );
};

export default BookList;
