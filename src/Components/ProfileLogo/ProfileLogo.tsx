import React from "react";
import styled from "styled-components";

type Props = {
  avatarPath: string;
};

const ProfileLogoWrapper = styled.div`
  margin-left: 1rem;

  & img {
    object-fit: cover;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const ProfileLogo = ({ avatarPath }: Props) => {
  return (
    <ProfileLogoWrapper>
      <img src={avatarPath} alt="Profile picture" />
    </ProfileLogoWrapper>
  );
};

export default ProfileLogo;
