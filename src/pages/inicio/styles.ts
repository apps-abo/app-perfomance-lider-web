import styled from "@emotion/styled";

export const Main = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  padding: 24px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.img`
  border-radius: 20px;
  box-shadow: 0 2px 25px rgba(255, 255, 255, 0.3);
`;

export const Message = styled.p`
  margin-top: 24px;
  color: #fff;
  text-align: center;
  font-size: 1.1rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  max-width: 420px;
`;

export const OpenButton = styled.button`
  border-radius: 10px;
  background-color: #b27f2a;
  color: #fff;
  border: none;
  padding: 0.7rem 2.2rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 28px;
  box-shadow: 0 2px 25px rgba(255, 255, 255, 0.2);
  cursor: pointer;

  :active {
    background-color: #2a95bf;
  }
`;
