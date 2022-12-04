import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthPageLayout from "../../Layouts/AuthPageLayout/AuthPageLayout";

import FormBottomLink from "../../Components/Form/FormBottomLink";
import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormTitleContainer from "../../Components/Form/FormTitleContainer";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";
import IncorrectInput from "../../Components/Form/IncorrectInput";
import {
  validateNonEmpty,
  xssSanitize,
} from "../../Components/Form/validators";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

  const isInputValid = (user: { username: string; password: string }) => {
    setInvalidUsername(!validateNonEmpty(user.username));
    setInvalidPassword(!validateNonEmpty(user.password));
    return validateNonEmpty(user.username) && validateNonEmpty(user.password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: xssSanitize(username),
      password: xssSanitize(password),
    };

    if (isInputValid(user)) {
      fetch("/api/auth/login", {
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
    }
  };

  useEffect(() => {
    fetch("/api/auth/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate("/") : null));
    // eslint-disable-next-line
  }, []);

  return (
    <AuthPageLayout>
      <>
        <LoadingOverlay />
        <FormTitleContainer>
          <h3>Login</h3>
        </FormTitleContainer>
        <Form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <IncorrectInput
            message="Username is required"
            display={invalidUsername}
          />
          <FormInput
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <IncorrectInput
            message="Password is required"
            display={invalidPassword}
          />
          <FormSubmitButton type="submit">Login</FormSubmitButton>
        </Form>
        <FormBottomLink>
          Dont have account? <Link to={"/register"}>Sign Up</Link> now.
        </FormBottomLink>
      </>
    </AuthPageLayout>
  );
};

export default Login;
