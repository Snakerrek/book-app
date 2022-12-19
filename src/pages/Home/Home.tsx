import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";
import LastActivity from "../../Components/Profile/LastActivity";
import { getUserData } from "../../helpers";
import { UserData } from "../../types";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const userTokenData = getUserData();
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    const userDataJson = await fetch(`/api/user/get/${userTokenData?.id}`);
    const userData = await userDataJson.json();
    setUserData(userData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userTokenData?.id) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingOverlay />
      <HomeWrapper>
        <h1>Strona główna</h1>
        {userData && <LastActivity userData={userData} followingMode />}
      </HomeWrapper>
    </>
  );
};

export default Home;
