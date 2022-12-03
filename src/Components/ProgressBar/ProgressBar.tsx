import React from "react";
import styled from "styled-components";

type Props = {
  done: number;
  max: number;
};

const Progress = styled.div`
  background-color: #d8d8d8;
  border-radius: 20px;
  position: relative;
  margin: 15px 0;
  height: 30px;
  width: 300px;
  position: relative;

  span {
    position: absolute;
    top: 20%;
    left: 35%;
    color: white;
  }
`;

interface ProgressDoneProps {
  width: number;
}

const ProgressDone = styled.div<ProgressDoneProps>`
  background: ${(props) => props.theme.gradients.purple};
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  border-radius: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${(props) => (props.width > 5 ? props.width : 5)}%;
  transition: 1s ease 0.3s;
`;

const ProgressBar = ({ done, max }: Props) => {
  const [progress, setProgress] = React.useState(0);

  setTimeout(() => {
    setProgress(Math.floor((done / max) * 100));
  }, 200);

  return (
    <Progress>
      <ProgressDone width={progress}></ProgressDone>
      <span>
        {done + "/" + max} ({progress}%)
      </span>
    </Progress>
  );
};

export default ProgressBar;
