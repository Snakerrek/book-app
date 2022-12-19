import styled from "styled-components";

const SmallCoverPlaceholder = styled.div`
  height: 125px;
  width: 100px;
  background-image: url("/images/bookPlaceholder.png");
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  margin-left: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  :hover {
    transform: scale(1.05);
  }

  p {
    font-size: 0.7rem;
  }
`;

export default SmallCoverPlaceholder;
