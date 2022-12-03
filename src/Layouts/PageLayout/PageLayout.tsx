import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/SideBar";

const ContentWrapper = styled.main`
  padding: 4rem 0 0 5rem;
`;

const PageLayout = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const checkAuthentication = () => {
    fetch("/api/auth/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? setAuthenticated(true) : navigate("/login")
      );
  };

  useEffect(() => {
    checkAuthentication();
    setInterval(checkAuthentication, 10 * 60 * 1000);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {authenticated && (
        <>
          <Sidebar />
          <Navbar />
          <ContentWrapper>
            <>
              <LoadingOverlay />
              <Outlet />
            </>
          </ContentWrapper>
        </>
      )}
    </>
  );
};

export default PageLayout;
