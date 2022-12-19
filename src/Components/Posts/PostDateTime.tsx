import React from "react";
import styled from "styled-components";
import { getDateTime } from "../../helpers";

type Props = {
  date: Date;
};

const PostDateTimeWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end !important;
  margin: 10px 0 -16px 16px;
  p {
    background-color: ${(props) => props.theme.colors.purple};
    border-radius: 5px;
    padding: 5px;
  }
`;

const PostDateTime = ({ date }: Props) => {
  return (
    <PostDateTimeWrapper>
      <p>{getDateTime(date)}</p>
    </PostDateTimeWrapper>
  );
};

export default PostDateTime;
