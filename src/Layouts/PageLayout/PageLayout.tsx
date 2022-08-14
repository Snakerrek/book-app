import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ContentWrapper = styled.main`
  margin-left: 5rem;
  padding: 1rem;
`;

const PageLayout = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    fetch("/auth/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? setAuthenticated(true) : navigate("/login")
      );
  }, []);

  return (
    <>
      {authenticated && (
        <>
          <Sidebar />
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        </>
      )}
    </>
  );
};

export default PageLayout;
