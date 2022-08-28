import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthPageLayout from "../../Layouts/AuthPageLayout/AuthPageLayout";

import FormBottomLink from "../../Components/Form/FormBottomLink";
import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormTitleContainer from "../../Components/Form/FormTitleContainer";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";

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
        }
      });
  };

  useEffect(() => {
    fetch("/api/auth/isUserAuth", {
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
        <FormTitleContainer>
          <h3>Register</h3>
        </FormTitleContainer>
        <Form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormSubmitButton type="submit">Register</FormSubmitButton>
        </Form>
        <FormBottomLink>
          Have account? <Link to={"/login"}>Sign In</Link> now.
        </FormBottomLink>
      </>
    </AuthPageLayout>
  );
};

export default Register;
