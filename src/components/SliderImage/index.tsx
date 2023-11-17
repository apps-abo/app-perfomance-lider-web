import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./TrocaImagensAutomatica.module.css";

const TrocaImagensAutomatica: React.FC = () => {
  const imagens = ['/images/Screenshot_302.png','/images/Screenshot_301.png','/images/GiorgioArmani2.jpg','/images/R (1).png'];
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
    <div className={styles.carouselContainer}>
      <div className={styles.carouselInner}>
        {imagens.map((imagem, index) => (
          <div
            key={index}
            className={`${styles.carouselItem} ${
              index === indiceImagem ? styles.visible : styles.hidden
            }`}
          >
            <Image
              src={imagem}
              alt={`Imagem ${index + 1}`}
              layout="fill" 
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrocaImagensAutomatica;
