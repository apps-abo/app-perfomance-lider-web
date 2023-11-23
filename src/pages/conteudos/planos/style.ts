import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  align-items: center;
  background-color: #000;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Text = styled.p`
  font-size: 1.5rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;
export const Button = styled.button`
  border-radius: 10px;
  background-color: #b27f2a;
  color: #fff;
  border: none;
  padding: 0.5rem 2rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 5%;
  box-shadow: 0 2px 25px rgba(255, 255, 255, 0.2);
  cursor: pointer;
  :active {
    background-color: #2a95bf;
  }
  /* position: absolute;
  bottom: 30%; */
`;
export const Image = styled.div`
  width: 40%;
  /* height: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageLider = styled.img`
  border-radius: 60px;
  box-shadow: 0 2px 25px rgba(255,255,255, 0.3);
`

export const ImagemFund = styled.img`
  width: 100%;
  height: 100%;
  flex: 1;
`