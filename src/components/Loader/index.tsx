import React from 'react';
import styled, { keyframes } from 'styled-components';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1); /* Cor da borda externa */
  width: 40px; /* Largura do spinner */
  height: 40px; /* Altura do spinner */
  border-radius: 50%;
  border-left-color: #005bab; /* Cor da parte do spinner que será visível */
  animation: ${rotate} 1s linear infinite;
`;

const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

export default LoadingSpinner;