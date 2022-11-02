import React, { useState } from "react";
import styled from "styled-components";
import ChangePasswordForm from "../../Components/EditProfileForms/ChangePasswordForm";

const EditProfileWrapper = styled.div`
  text-align: center;
`;

const EditProfile = () => {
  return (
    <EditProfileWrapper>
      <h1> Edytuj profil </h1>
      <ChangePasswordForm />
    </EditProfileWrapper>
  );
};

export default EditProfile;
