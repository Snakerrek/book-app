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
  validateEmail,
  validateNonEmpty,
  validatePassword,
  xssSanitize,
} from "../../Components/Form/validators";
import { getAvatar } from "../../configService";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

  const [serverResMess, setServerResMess] = useState<string>();

  const isInputValid = (user: {
    username: string;
    email: string;
    password: string;
    avatar: string | undefined;
  }) => {
    setInvalidUsername(!validateNonEmpty(user.username));
    setInvalidEmail(!validateEmail(user.email));
    setInvalidPassword(!validatePassword(user.password));
    return (
      validateNonEmpty(user.username) &&
      validateEmail(user.email) &&
      validatePassword(user.password)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      username: xssSanitize(username),
      email: xssSanitize(email),
      password: xssSanitize(password),
      avatar: getAvatar("default")?.url ? getAvatar("default")?.url : "",
    };
    if (isInputValid(user)) {
      await fetch("/api/auth/register", {
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
          <h3>Zarejestruj się</h3>
        </FormTitleContainer>
        <Form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Nazwa użytkownika"
            onChange={(e) => setUsername(e.target.value)}
          />
          <IncorrectInput
            message="Nazwa użytkownika jest niepoprawna"
            display={invalidUsername}
          />
          <FormInput
            type="text"
            placeholder="Adres e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <IncorrectInput
            message="Adres e-mail jest niepoprawny"
            display={invalidEmail}
          />
          <FormInput
            type="password"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
          />
          <IncorrectInput
            message="Hasło nie spełnia wymagań"
            display={invalidPassword}
          />
          {serverResMess && <IncorrectInput message={serverResMess} display />}
          <FormSubmitButton type="submit">Zarejestruj się</FormSubmitButton>
        </Form>
        <FormBottomLink>
          Masz już konto? <Link to={"/login"}>Zaloguj się</Link> teraz.
        </FormBottomLink>
      </>
    </AuthPageLayout>
  );
};

export default Register;
