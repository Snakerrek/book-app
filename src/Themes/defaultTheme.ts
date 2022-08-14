import { createGlobalStyle } from "styled-components";

const defaultTheme = {
  textColors: {
    black: "#222222",
    grey: "#464A53",
    lightGrey: "#76838F",
    white: "#FFFFFF",
    purple: "#7571f9",
  },
  backgroundColors: {
    grey: "#F3F3F9",
    white: "#FFFFFF",
  },
  colors: {
    purple: "#847DFA",
    pastelPink: "#F196B0",
    pink: "#F96C8E",
    green: "#6FD96F",
    orange: "#F29D56",
    superLightGrey: "#f5f5f5",
  },
  shadows: {
    lightGreyShadow: "-1px -1px 17px -4px rgba(202, 202, 202, 1)",
  },
  gradients: {
    orange:
      "linear-gradient(90deg, rgba(249, 126, 67, 1) 26%, rgba(251, 189, 122, 1) 100%)",
    blue: "linear-gradient(90deg, rgba(94, 135, 255, 1) 26%, rgba(33, 83, 253, 1) 100%)",
    purple:
      "linear-gradient(90deg, rgba(181, 101, 218, 1) 26%, rgba(238, 96, 157, 1) 100%)",
    pink: "linear-gradient(90deg, rgba(250, 159, 158, 1) 26%, rgba(249, 101, 140, 1) 100%)",
  },
  fontWeight: {
    light: "400",
    bold: "600",
  },
  fontSize: {
    // Sizes relative to 16px default value
    XXL: "2.5rem", // 40px
    XL: "1.875rem", // 30px
    L: "1.5rem", // 24px
    M: "1.125rem", // 18px
    S: "0.875rem", // 14px
    XS: "0.75rem", // 12px
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  body {
    background-color: #F3F3F9;
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
`;

export default defaultTheme;
