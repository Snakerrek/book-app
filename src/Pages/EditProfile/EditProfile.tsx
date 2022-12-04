import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChangeAvatarForm from "../../Components/EditProfileForms/ChangeAvatarForm";
import ChangePasswordForm from "../../Components/EditProfileForms/ChangePasswordForm";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";
import { getUserData } from "../../helpers";
import { UserData } from "../../types";

const Title = styled.h1`
  text-align: center;
`;

const EditProfileWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const EditProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    const userDataToken = getUserData();
    const userDataJson = await fetch(`/api/user/get/${userDataToken?.id}`);
    const userData = await userDataJson.json();
    setUserData(userData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <LoadingOverlay />
      <Title> Edytuj profil </Title>
      <EditProfileWrapper>
        {userData && (
          <>
            <ChangeAvatarForm userData={userData} setUserData={setUserData} />
            <ChangePasswordForm />
          </>
        )}
      </EditProfileWrapper>
    </>
  );
};

export default EditProfile;
