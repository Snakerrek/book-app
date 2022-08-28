import React from "react";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { ItemText } from "./SidebarItem";

import sidebarItems from "./sidebarItems";

export const SidebarWrapper = styled.nav`
  width: 4rem;
  height: 100vh;
  position: fixed;
  background-color: ${(p) => p.theme.backgroundColors.white};
  z-index: 100;

  &:hover {
    width: 12rem;

    ${ItemText} {
      display: block;
    }
  }
`;
const SidebarItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarItems>
        {sidebarItems.map((item, index) => (
          <SidebarItem key={`sidebarItem-${index}`} item={item} />
        ))}
      </SidebarItems>
    </SidebarWrapper>
  );
};

export default Sidebar;
