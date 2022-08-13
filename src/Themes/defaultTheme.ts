import { createGlobalStyle } from "styled-components";

const defaultTheme = {
  fontBig: "50px",
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export default defaultTheme;
