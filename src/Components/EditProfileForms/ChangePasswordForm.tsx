import React, { useState } from "react";
import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";
import {
  validatePassword,
  validateNonEmpty,
} from "../../Components/Form/validators";
import IncorrectInput from "../../Components/Form/IncorrectInput";
import { getUserData } from "../../helpers";
import FormGroup from "./FormGroup";

const ChangePasswordForm = () => {
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
    <FormGroup maxWidth="300px">
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
          message={"Musisz podać stare hasło"}
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
          message={"Nowe hasło nie spełnia wymagań"}
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
          message={"Hasła nie są takie same"}
          display={invalidPasswordConfirmation}
        />
        <FormSubmitButton>Zmień hasło</FormSubmitButton>
      </Form>
    </FormGroup>
  );
};

export default ChangePasswordForm;
