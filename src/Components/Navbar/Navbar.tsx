import React from "react";
import styled from "styled-components";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Searchbar from "../Searchbar/Searchbar";

const NavbarWrapper = styled.nav`
  background: ${(props) => props.theme.backgroundColors.white};
  width: 100vw;
  height: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
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
      <ProfileDropdown />
    </NavbarWrapper>
  );
};

export default Navbar;
