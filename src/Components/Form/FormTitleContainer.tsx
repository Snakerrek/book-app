import styled from "styled-components";

const FormTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  h3 {
    font-size: ${(props) => props.theme.fontSize.M};
    color: ${(props) => props.theme.textColors.grey};
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;

export default FormTitleContainer;
