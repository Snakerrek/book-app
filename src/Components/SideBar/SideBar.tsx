import React from "react";
import styled from "styled-components";

const SidebarWrapper = styled.nav`
  font-size: ${(props) => props.theme.fontBig};
`;

const Sidebar = () => {
  return <SidebarWrapper>SideBar</SidebarWrapper>;
};

export default Sidebar;
