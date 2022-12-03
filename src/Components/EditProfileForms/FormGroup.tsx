import styled from "styled-components";

interface Props {
  maxWidth?: string;
}

const FormGroup = styled.div<Props>`
  background-color: ${(p) => p.theme.backgroundColors.white};
  min-width: 300px;
  max-width: ${(p) => p.maxWidth || "300px"};
  padding: 15px;
  border-radius: 5px;
  margin: 10px;
  flex: 1 1 auto;
  & h2 {
    margin: 0;
    text-align: center;
  }

  & form {
    margin: 10px;
  }
`;

export default FormGroup;
