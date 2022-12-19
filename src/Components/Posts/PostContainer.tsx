import styled from "styled-components";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.backgroundColors.white};
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  width: 95%;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  h3 {
    margin: 10px;
  }

  p {
    margin: 0;
  }
`;

export default PostContainer;
