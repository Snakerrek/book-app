import React from "react";
import styled from "styled-components";
import ProfileLogo from "../ProfileLogo/ProfileLogo";
import Searchbar from "../Searchbar/Searchbar";

const NavbarWrapper = styled.nav`
  background: ${(props) => props.theme.backgroundColors.white};
  width: 100vw;
  height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 13rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 576px) {
    padding-left: 5rem;
  }
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Searchbar />
      <ProfileLogo avatarPath="https://storage.googleapis.com/otwarteklatki-wp-media/sites/1/2016/07/goat-1438231_1920.jpg" />
    </NavbarWrapper>
  );
};

export default Navbar;
