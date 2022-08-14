import styled from "styled-components";

const AuthSubmitButton = styled.button`
  width: 100%;
  padding: 15px 40px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.M};
  color: ${(props) => props.theme.textColors.white};
  border: none;
  background: ${(props) => props.theme.colors.purple};
  border-radius: 0.25rem;
  cursor: pointer;
`;

export default AuthSubmitButton;
