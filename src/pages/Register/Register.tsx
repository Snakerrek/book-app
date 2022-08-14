import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthPageLayout from "../../Layouts/AuthPageLayout/AuthPageLayout";

import AuthBottomLink from "../../Components/AuthForm/AuthBottomLink";
import AuthForm from "../../Components/AuthForm/AuthForm";
import AuthInput from "../../Components/AuthForm/AuthInput";
import AuthTitleContainer from "../../Components/AuthForm/AuthTitleContainer";
import AuthSubmitButton from "../../Components/AuthForm/AuthSubmitButton";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };

    await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.registerSuccessful) {
          navigate("/login");
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
      </>
    </AuthPageLayout>
  );
};

export default Register;
