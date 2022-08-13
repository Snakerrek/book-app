import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ContentWrapper = styled.main`
  margin-left: 5rem;
  padding: 1rem;
`;

const PageLayout = () => {
  return (
    <>
      <Sidebar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default PageLayout;
