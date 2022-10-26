import React from "react";
import styled from "styled-components";

type Props = {
  message: string;
  display: boolean;
};

const RedParagraph = styled.p`
  color: red !important;
  margin-top: -20px;
`;

const IncorrectInput = (props: Props) => {
  const { message, display } = props;

  return <>{display && <RedParagraph>{message}</RedParagraph>}</>;
};

export default IncorrectInput;
