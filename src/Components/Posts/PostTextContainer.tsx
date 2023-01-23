import styled from "styled-components";

const PostTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.backgroundColors.white};
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  width: 95%;
`;

export default PostTextContainer;
