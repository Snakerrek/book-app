import styled from "styled-components";

const FormBottomLink = styled.span`
  font-size: ${(props) => props.theme.fontSize.S};
  color: ${(props) => props.theme.textColors.lightGrey};
  & a {
    text-decoration: none;
    color: ${(props) => props.theme.textColors.purple};
  }
`;

export default FormBottomLink;
