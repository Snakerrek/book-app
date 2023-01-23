import React from "react";
import styled from "styled-components";

type Props = {
  message: string;
  display: boolean;
};

const RedParagraph = styled.p`
  color: red !important;
  margin: -20px 0 5px 0 !important;
`;

const IncorrectInput = (props: Props) => {
  const { message, display } = props;

  return <>{display && <RedParagraph>*{message}</RedParagraph>}</>;
};

export default IncorrectInput;
