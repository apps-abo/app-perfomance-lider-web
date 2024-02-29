import styled from "@emotion/styled";

export const PageMain = styled.div`
  background-attachment: fixed;
  background-color: #e5e5e5;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 768px) {
    padding: 10px; /* Ajustado para responsividade */
  }
`;

export const CardData = styled.div`
  width: 39%;
  height: 60vh;
  padding: 2.5%;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 90%;
    padding: 5%;
  }
`;

export const DivLogoImage = styled.div`
  width: 20vw;
  height: 20vh;

  @media (max-width: 768px) {
    width: 80%;
    max-width: 100px;
  }
`;
export const DivTextLogin = styled.div`
  margin: 5% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  h1 {
    font-family: "Roboto";
    font-weight: 700;
    font-size: 22px;
  }
  p {
    font-family: "Roboto";
    font-size: 14px;
    text-align: center;
  }

  @media (max-width: 768px) {
    margin: 2.5% 0;
  }
`;

export const CreditCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
  h1 {
    font-family: "Roboto";
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 10px;
  }
  p {
    font-family: "Roboto";
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const DivImages = styled.div`
  img {
    margin-left: 30px;
    align-items: center;
  }
`;

export const DivTermos = styled.div`
  margin: 20px;
  p {
    font-family: "Roboto";
    font-size: 14px;
    text-align: center;
  }
`;

export const FlexWrap = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
export const TextDev = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-family: "Roboto";
    font-size: 12px;
    opacity: 0.7;
    @media (max-width: 450px) {
      font-size: 10px;
    }
  }
`;
