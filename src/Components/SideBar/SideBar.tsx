import React from "react";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { ItemText } from "./SidebarItem";

import sidebarItems from "./sidebarItems";

export const SidebarWrapper = styled.nav`
  width: 5rem;
  height: 100vh;
  position: fixed;
  background-color: ${(p) => p.theme.backgroundColors.white};

  &:hover {
    width: 16rem;

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
        {sidebarItems.map((item) => (
          <SidebarItem item={item} />
        ))}
      </SidebarItems>
    </SidebarWrapper>
  );
};

export default Sidebar;
