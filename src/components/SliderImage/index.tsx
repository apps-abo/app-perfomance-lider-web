import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TrocaImagensContainer, TrocaImagensInner, TrocaImagensItem } from "./styles";
;

const TrocaImagensAutomatica: React.FC = () => {
  const imagens = [
    "/images/Screenshot_302.png",
    "/images/Screenshot_301.png",
    "/images/GiorgioArmani2.jpg",
    "/images/R (1).png",
  ];
  const [indiceImagem, setIndiceImagem] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Trocar para a próxima imagem
      setIndiceImagem((prevIndice) => (prevIndice + 1) % imagens.length);
    }, 5000); // Troca a cada 5 segundos (ajuste conforme necessário)

    return () => {
      // Limpar o intervalo quando o componente é desmontado
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TrocaImagensContainer>
      <TrocaImagensInner>
        {imagens.map((imagem, index) => (
          <TrocaImagensItem
            key={index}
            className={index === indiceImagem ? "visible" : "hidden"}
          >
            <Image
              src={imagem}
              alt={`Imagem ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </TrocaImagensItem>
        ))}
      </TrocaImagensInner>
    </TrocaImagensContainer>
  );
};

export default TrocaImagensAutomatica;


