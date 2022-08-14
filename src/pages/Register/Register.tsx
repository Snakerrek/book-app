import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AuthBottomLink from "../../Components/AuthForm/AuthBottomLink";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthInput from "../../Components/AuthForm/AuthInput";
import AuthTitleContainer from "../../Components/AuthForm/AuthTitleContainer";
import AuthSubmitButton from "../../Components/AuthForm/AuthSubmitButton";

const RegisterWrapper = styled.div`
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

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <RegisterWrapper>
      <AuthTitleContainer>
        <h3>Register</h3>
      </AuthTitleContainer>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <AuthInput
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthSubmitButton type="submit">Register</AuthSubmitButton>
      </AuthForm>
      <AuthBottomLink>
        Have account? <Link to={"/login"}>Sign In</Link> now.
      </AuthBottomLink>
    </RegisterWrapper>
  );
};

export default Register;
