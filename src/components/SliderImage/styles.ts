import styled from "@emotion/styled";

export const TrocaImagensContainer = styled.div`
  position: relative;
  width: 50vw;
  height: 90vh;
  overflow: hidden;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
  border-radius: 13px;
  margin: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  @media (max-width: 768px) {
    width: 50%;
    height: 50vh;
    justify-content: flex-start;
    display: none;
  }
`;

export const TrocaImagensInner = styled.div`
  display: flex;
`;

export const TrocaImagensItem = styled.div`
  flex: 0 0 50vw;
  height: 100%;
  transition: opacity 1s ease-in-out;

  &.visible {
    opacity: 1;
  }

  &.hidden {
    opacity: 0;
  }
  @media (max-width: 420px) {
    flex: 0 0 100%;
    display: none;
  }
`;
