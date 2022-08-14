import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentWrapper = styled.main`
  background: ${(props) => props.theme.backgroundColors.white};
  border-radius: 0.5rem;
  padding: 1.5rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, 550px);
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  padding-bottom: 2rem;
`;

const AuthPageLayout = (props: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  useEffect(() => {
    fetch("/auth/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/") : setDisplay(true)));
  }, []);

  return (
    <>
      {display && (
        <>
          <ContentWrapper>{props.children}</ContentWrapper>
        </>
      )}
    </>
  );
};

export default AuthPageLayout;
