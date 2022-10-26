import React, { useState } from "react";
import styled from "styled-components";
import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";
import { getUserData } from "../../helpers";
import {
  validatePassword,
  validateNonEmpty,
} from "../../Components/Form/validators";
import IncorrectInput from "../../Components/Form/IncorrectInput";

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

  const [invalidNewPassword, setInvalidNewPassword] = useState(false);
  const [invalidPasswordConfirmation, setInvalidPasswordConfirmation] =
    useState(false);
  const [invalidOldPassword, setInvalidOldPassword] = useState(false);

  const isInputCorrect = (
    oldPassword: string,
    password: string,
    passwordConfirmation: string
  ) => {
    const isPasswordCorrect = validatePassword(password);
    const isPasswordConfirmationCorrect = password === passwordConfirmation;
    const isOldPasswordCorrect = validateNonEmpty(oldPassword);

    setInvalidNewPassword(!isPasswordCorrect);
    setInvalidPasswordConfirmation(!isPasswordConfirmationCorrect);
    setInvalidOldPassword(!isOldPasswordCorrect);

    return (
      isPasswordCorrect && isPasswordConfirmationCorrect && isOldPasswordCorrect
    );
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword({ ...password, [e.target.name]: value });
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = getUserData();

    if (
      isInputCorrect(
        password.oldPassword,
        password.password,
        password.confirmPassword
      )
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
            type="password"
            placeholder="Podaj stare hasło"
            name="oldPassword"
            value={password.oldPassword}
            onChange={updatePassword}
          />
          <IncorrectInput
            message={"You must provide old password"}
            display={invalidOldPassword}
          />
          <FormInput
            type="password"
            placeholder="Podaj nowe hasło"
            name="password"
            value={password.password}
            onChange={updatePassword}
          />
          <IncorrectInput
            message={"New password is incorrect"}
            display={invalidNewPassword}
          />
          <FormInput
            type="password"
            placeholder="Podaj hasło ponownie"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={updatePassword}
          />
          <IncorrectInput
            message={"Passwords are not the same"}
            display={invalidPasswordConfirmation}
          />
          <FormSubmitButton>Zmień hasło</FormSubmitButton>
        </Form>
      </FormGroup>
    </EditProfileWrapper>
  );
};

export default EditProfile;
