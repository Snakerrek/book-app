import styled from "styled-components";

const AuthInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.superLightGrey};
  width: 100%;
  color: ${(props) => props.theme.textColors.lightGrey};
  font-size: ${(props) => props.theme.fontSize.S};
  min-height: 40px;
  padding: 0.375rem 0;
  margin-bottom: 30px;
  &:focus {
    outline: none;
  }
`;

export default AuthInput;
