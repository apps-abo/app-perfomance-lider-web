import styled from "@emotion/styled";

export const Page = styled.div`
  background-attachment: fixed;
  background-color: #e5e5e5;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 768px) {
    padding: 10px; /* Ajustado para responsividade */
  }
`;

export const Bloco = styled.div`
  width: 39%;
  height: 80vh;
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

export const DivLogo = styled.div`
  width: 20vw;
  height: 20vh;
  
  @media (max-width: 768px) {
    width: 80%;
    max-width: 100px;
  }
`;
export const DivText = styled.div`
  margin: 5% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  grid-gap: 2vh;
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

export const Flex = styled.div`
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
export const Text = styled.div`
  p {
    font-family: "Roboto";
    font-size: 12px;
    opacity: 0.7;
    @media (max-width: 450px) {
      font-size: 10px
    }
  }
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const DivLink = styled.div`
  margin: 5% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  grid-gap: 2vh;
  h1 {
    font-family: "Roboto";
    font-weight: 700;
    font-size: 22px;
    color: red;
    @media (max-width: 450px) {
      font-size: 1rem;
      text-align: center;
      width: 90%;
    }
  }
  p {
    font-family: "Roboto";
    font-size: 18px;
    text-align: center;
    @media (max-width: 450px) {
      font-size: 1rem;
      width: 90%;
    }
  }
`;