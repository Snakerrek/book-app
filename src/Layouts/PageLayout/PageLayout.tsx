import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ContentWrapper = styled.main`
  margin-left: 5rem;
  padding: 1rem;
`;

const PageLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("hi");
    fetch("/auth/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? null : navigate("/login")));
  }, []);

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
