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

  const [serverResMess, setServerResMess] = useState<string>();

  const isInputValid = (user: { username: string; password: string }) => {
    setInvalidUsername(!validateNonEmpty(user.username));
    setInvalidPassword(!validateNonEmpty(user.password));
    return validateNonEmpty(user.username) && validateNonEmpty(user.password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: any = {
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
          } else {
            setServerResMess(data.message);
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
          <h3>Zaloguj się</h3>
        </FormTitleContainer>
        <Form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Nazwa użytkownika"
            onChange={(e) => setUsername(e.target.value)}
          />
          <IncorrectInput
            message="Nazwa użytkownika jest wymagana"
            display={invalidUsername}
          />
          <FormInput
            type="password"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
          />
          <IncorrectInput
            message="Hasło jest wymagane"
            display={invalidPassword}
          />
          {serverResMess && <IncorrectInput message={serverResMess} display />}
          <FormSubmitButton type="submit">Zaloguj się</FormSubmitButton>
        </Form>
        <FormBottomLink>
          Nie masz konta? <Link to={"/register"}>Zarejestruj się</Link> teraz.
        </FormBottomLink>
      </>
    </AuthPageLayout>
  );
};

export default Login;
