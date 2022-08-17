import React from "react";
import styled from "styled-components";

type Props = {
  avatarPath: string;
};

const ProfileLogoWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  padding: 0.4rem;

  & img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
