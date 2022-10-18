import { ppid } from "process";
import React, { useState } from "react";
import styled from "styled-components";
import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";
import { getUserData } from "../../helpers";

const EditProfileWrapper = styled.div`
  text-align: center;
`;

const FormGroup = styled.div`
  background-color: ${(p) => p.theme.backgroundColors.white};
  max-width: 300px;
  padding: 15px;
  border-radius: 5px;

  & h2 {
    margin: 0;
    text-align: center;
  }

  & form {
    margin: 0;
    input {
      background-color: ${(p) => p.theme.backgroundColors.grey};
      margin: 10px 0;
    }
  }
`;

const EditProfile = () => {
  const [password, setPassword] = useState<{
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword({ ...password, [e.target.name]: value });
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = getUserData();
    console.log("Change password");
    if (
      password.password === password.confirmPassword &&
      password.oldPassword
    ) {
      await fetch(`/api/user/update/${userData?.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: password.oldPassword,
          password: password.password,
          userId: userData?.id,
        }),
      });
      setPassword({ oldPassword: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <EditProfileWrapper>
      <h1> Edytuj profil </h1>
      <FormGroup>
        <h2>Zmień hasło</h2>
        <Form onSubmit={changePassword}>
          <FormInput
            type="text"
            placeholder="Podaj stare hasło"
            name="oldPassword"
            value={password.oldPassword}
            onChange={updatePassword}
          />
          <FormInput
            type="text"
            placeholder="Podaj nowe hasło"
            name="password"
            value={password.password}
            onChange={updatePassword}
          />
          <FormInput
            type="text"
            placeholder="Podaj hasło ponownie"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={updatePassword}
          />
          <FormSubmitButton>Zmień hasło</FormSubmitButton>
        </Form>
      </FormGroup>
    </EditProfileWrapper>
  );
};

export default EditProfile;
