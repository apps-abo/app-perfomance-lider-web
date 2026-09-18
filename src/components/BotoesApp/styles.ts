import styled from "@emotion/styled";

export const Botoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Botao = styled.button`
  border-radius: 10px;
  background-color: #b27f2a;
  color: #fff;
  border: none;
  padding: 0.75rem 2.5rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 2px 25px rgba(255, 255, 255, 0.2);
  cursor: pointer;

  :active {
    background-color: #2a95bf;
  }
`;

export const BotaoSecundario = styled.a`
  color: #fff;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1rem;
  text-decoration: underline;
`;
