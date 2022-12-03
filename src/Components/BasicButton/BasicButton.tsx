import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
  onClick: () => void;
  big?: boolean;
  backgroundGradient?: "blue" | "purple" | "orange" | "pink";
};

interface ButtonProps {
  big?: boolean;
  backgroundGradient?: "blue" | "purple" | "orange" | "pink";
}

const Button = styled.button<ButtonProps>`
  max-width: fit-content;
  padding: ${(props) => (props.big ? "15px 40px" : "10px 30px")};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) =>
    props.big ? props.theme.fontSize.M : props.theme.fontSize.S};
  color: ${(props) => props.theme.textColors.white};
  border: none;
  background: ${(props) => {
    switch (props.backgroundGradient) {
      case "blue":
        return props.theme.gradients.blue;
      case "purple":
        return props.theme.gradients.purple;
      case "orange":
        return props.theme.gradients.orange;
      case "pink":
        return props.theme.gradients.pink;
      default:
        return props.theme.gradients.blue;
    }
  }};
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 5px;
`;

const BasicButton = ({ text, onClick, big, backgroundGradient }: Props) => {
  return (
    <Button onClick={onClick} big={big} backgroundGradient={backgroundGradient}>
      {text}
    </Button>
  );
};

export default BasicButton;
