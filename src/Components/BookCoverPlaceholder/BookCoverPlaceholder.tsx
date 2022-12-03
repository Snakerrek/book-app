import React from "react";
import styled from "styled-components";
import { BasicBookType } from "../../types";

type Props = {
  title?: string;
  authors?: string[];
};

const CoverPlaceholder = styled.div`
  height: 355px !important;
  width: 250px !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  & > div {
    position: absolute;
    z-index: 1;
    width: 200px;
    margin-left: -10px;

    h2,
    h3 {
      color: ${(props) => props.theme.textColors.black};
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const BookCoverPlaceholder = (props: Props) => {
  return (
    <CoverPlaceholder>
      <div>
        <h2>{props.title}</h2>
        <br />
        <h3>{props.authors?.join(", ")}</h3>
      </div>
      <img src="/images/bookPlaceholder.png" alt="book cover placeholder" />
    </CoverPlaceholder>
  );
};

export default BookCoverPlaceholder;
