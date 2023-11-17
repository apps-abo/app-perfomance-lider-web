import styled from "@emotion/styled";

export const MainPage = styled.div`
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
`;

export const Card = styled.div`
  width: 39%;
  height: 100vh;
  padding: 2.5%;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const DivLogoImage = styled.div`
  width: 20vw;
  height: 20vh;
`;
export const DivTextLogin = styled.div`
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
`;

export const FlexWrap = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
`;
export const TextDev = styled.div`
  p {
    font-family: "Roboto";
    font-size: 12px;
    opacity: 0.7;
  }
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const DivLinkValid = styled.div`
  width: 39%;
  height: 100vh;
  padding: 2.5%;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-family: "Roboto";
    font-weight: 700;
    font-size: 22px;
    color: red;
    margin: 0%;
    margin-top: 20px;
  }
  p {
    font-family: "Roboto";
    font-size: 18px;
    text-align: center;
  }
`;
