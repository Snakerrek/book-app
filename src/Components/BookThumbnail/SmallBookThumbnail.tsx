import styled from "styled-components";

const SmallBookThumbnail = styled.img`
  width: auto;
  height: 125px;
  margin: 0 0 0 10px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  :hover {
    transform: scale(1.05);
  }
`;

export default SmallBookThumbnail;
