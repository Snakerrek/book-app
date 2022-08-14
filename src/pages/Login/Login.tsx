import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthPageLayout from "../../Layouts/AuthPageLayout/AuthPageLayout";

import AuthBottomLink from "../../Components/AuthForm/AuthBottomLink";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthInput from "../../Components/AuthForm/AuthInput";
import AuthTitleContainer from "../../Components/AuthForm/AuthTitleContainer";
import AuthSubmitButton from "../../Components/AuthForm/AuthSubmitButton";

const LoginWrapper = styled.div``;

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
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
        }
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
    <AuthPageLayout>
      <>
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
      </>
    </AuthPageLayout>
  );
};

export default Login;
