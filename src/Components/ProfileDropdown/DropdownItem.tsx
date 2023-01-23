import React from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DropdownItemLi = styled.li`
  display: flex;
  align-items: center;
  margin: 10px auto;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover p {
    color: rgb(212, 33, 9);
    cursor: pointer;
  }

  &:hover img {
    opacity: 1;
    cursor: pointer;
  }

  & svg {
    max-width: 20px;
    margin-right: 10px;
    opacity: 0.5;
  }

  & p {
    max-width: 100px;
    margin-left: 10px;
    margin-bottom: 0;
  }
`;

type Props = {
  Icon: IconType;
  text: string;
  link: string;
  onRedirect: () => void;
};

const DropdownItem = (props: Props) => {
  const { Icon, text, link, onRedirect } = props;
  const navigate = useNavigate();

  return (
    <DropdownItemLi
      onClick={() => {
        onRedirect();
        navigate(link);
      }}
    >
      <Icon />
      <p> {text} </p>
    </DropdownItemLi>
  );
};

export default DropdownItem;
