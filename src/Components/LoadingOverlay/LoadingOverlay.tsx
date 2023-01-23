import React from "react";
import styled from "styled-components";

const Loading = styled.div<{ opacity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: radial-gradient(#8e2de2, #4a00e0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s ease-in-out;

  h1 {
    color: #ffffff;
    text-align: center;
    font-family: sans-serif;
    text-transform: uppercase;
    font-size: 20px;
    position: relative;
  }

  .loader {
    margin: 5% auto 30px;
  }

  .book {
    border: 4px solid #ffffff;
    width: 120px;
    height: 90px;
    position: relative;
    perspective: 150px;
  }

  .page {
    display: block;
    width: 60px;
    height: 90px;
    border: 4px solid #ffffff;
    border-left: 1px solid #8455b2;
    margin: 0;
    position: absolute;
    right: -4px;
    top: -4px;
    overflow: hidden;
    background: #8455b2;
    transform-style: preserve-3d;
    -webkit-transform-origin: left center;
    transform-origin: left center;
  }

  .book .page:nth-child(1) {
    animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 0.6s infinite;
  }

  .book .page:nth-child(2) {
    animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 0.45s infinite;
  }

  .book .page:nth-child(3) {
    animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 0.2s infinite;
  }

  @-webkit-keyframes pageTurn {
    0% {
      -webkit-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
    20% {
      background: #4b1e77;
    }
    40% {
      background: rebeccapurple;
      -webkit-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
    }
    100% {
      background: rebeccapurple;
      -webkit-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
    }
  }

  @keyframes pageTurn {
    0% {
      transform: rotateY(0deg);
    }
    20% {
      background: #4b1e77;
    }
    40% {
      background: rebeccapurple;
      transform: rotateY(-180deg);
    }
    100% {
      background: rebeccapurple;
      transform: rotateY(-180deg);
    }
  }
`;

const LoadingOverlay = () => {
  const [opacity, setOpacity] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  setTimeout(() => {
    setOpacity(0);
  }, 1000);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <>
      {loading && (
        <Loading opacity={opacity}>
          <div className="loader book">
            <figure className="page"></figure>
            <figure className="page"></figure>
            <figure className="page"></figure>
          </div>

          <h1>Reading</h1>
        </Loading>
      )}
    </>
  );
};

export default LoadingOverlay;
