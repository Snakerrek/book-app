import React from "react";
import styled from "styled-components";
import { UserData } from "../../types";
import FormGroup from "./FormGroup";
import { getAvailableAvatars } from "../../avatarsService";
import { Avatar } from "../../types";
import Form from "../Form/Form";
import FormSubmitButton from "../Form/FormSubmitButton";
import { getUserData } from "../../helpers";

const CurrentAvatar = styled.div`
  background-color: ${(p) => p.theme.backgroundColors.white};
  max-width: 300px;
  padding: 15px;
  border-radius: 5px;
  margin: 10px;
  & img {
    width: 100%;
  }
`;

const AvatarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  background: ${(p) => p.theme.backgroundColors.grey};
  border-radius: 5px;
  padding: 10px;
`;

interface AvatarImgProps {
  width: string;
}

interface AvatarImgProps {
  isChoosen?: boolean;
}
const AvatarImg = styled.img<AvatarImgProps>`
  width: ${(p) => p.width};
  height: auto;
  border-radius: 50%;
  margin: 10px;
  border: ${(p) => (p.isChoosen ? "2px solid red" : "none")};
`;

interface Props {
  userData: UserData;
  setUserData: (userData: UserData) => void;
}

const ChangeAvatarForm = ({ userData, setUserData }: Props) => {
  const [avatars, setAvatars] = React.useState<Avatar[]>(getAvailableAvatars());

  const chooseAvatar = (avatar: Avatar) => {
    const newAvatars = avatars.map((a) => {
      if (a.name === avatar.name) {
        return { ...a, isChoosen: true };
      } else {
        return { ...a, isChoosen: false };
      }
    });
    setAvatars(newAvatars);
  };

  const changeAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = getUserData();
    const avatarUrl = avatars.find((a) => a.isChoosen)?.url;

    const resJson = await fetch(`/api/user/updateAvatar/${userData?.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userData?.id,
        avatar: avatarUrl,
      }),
    });
    const res = await resJson.json();
    setUserData(res);
  };

  return (
    <FormGroup maxWidth="700px">
      <h2>Zmień avatar</h2>
      <AvatarImg width={"100px"} src={userData.avatar} alt="Current avatar" />
      <AvatarsContainer>
        {avatars.map((avatar: Avatar) => (
          <AvatarImg
            width={"75px"}
            src={avatar.url}
            alt="Avatar"
            key={`Avatar-${avatar.name}`}
            onClick={() => chooseAvatar(avatar)}
            isChoosen={avatar.isChoosen}
          />
        ))}
      </AvatarsContainer>
      <Form onSubmit={changeAvatar}>
        <FormSubmitButton>Zmień avatar</FormSubmitButton>
      </Form>
    </FormGroup>
  );
};

export default ChangeAvatarForm;
