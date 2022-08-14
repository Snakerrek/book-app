import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthBottomLink from "../../Components/AuthForm/AuthBottomLink";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthInput from "../../Components/AuthForm/AuthInput";
import AuthTitleContainer from "../../Components/AuthForm/AuthTitleContainer";
import AuthSubmitButton from "../../Components/AuthForm/AuthSubmitButton";

const LoginWrapper = styled.div`
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

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      });
  };

  useEffect(() => {
    fetch("/auth/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/") : null));
  }, []);

  return (
    <LoginWrapper>
      <AuthTitleContainer>
        <h3>Login</h3>
      </AuthTitleContainer>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthSubmitButton type="submit">Login</AuthSubmitButton>
      </AuthForm>
      <AuthBottomLink>
        Dont have account? <Link to={"/register"}>Sign Up</Link> now.
      </AuthBottomLink>
    </LoginWrapper>
  );
};

export default Login;
