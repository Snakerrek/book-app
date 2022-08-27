import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

type Props = {
  onClose?: () => void;
  title?: string;
  midContent?: JSX.Element;
  bottomContent?: JSX.Element;
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`;

const ModalContainer = styled.div`
  max-width: 600px;
  min-height: 200px;
  width: 80%;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background-color: ${(props) => props.theme.backgroundColors.white};
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
`;

const TopContainer = styled.div`
  height: 40px;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;

  & h2 {
    padding: 0;
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.L};
  }

  & svg {
    position: fixed;
    top: 15px;
    right: 15px;
    font-size: ${(props) => props.theme.fontSize.M};
  }
`;
const MidContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
`;
const BottomContainer = styled.div`
  width: 100%;
`;

const Modal = (props: Props) => {
  const { onClose, title, midContent, bottomContent } = props;
  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TopContainer>
          <h2>{title}</h2>
          <GrClose />
        </TopContainer>
        <MidContainer>{midContent}</MidContainer>
        <BottomContainer>{bottomContent}</BottomContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
