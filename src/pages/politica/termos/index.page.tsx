import { useEffect, useState } from "react";
import { policyTerms } from "../../../services/politica";
import Seo from "../../../components/Seo";
import { Container, Content, Title } from "../styles";

interface PolicyData {
  termos: string;
}

const Termos = () => {
  const [terms, setTerms] = useState<PolicyData | null>(null);
  console.log("oi");
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await policyTerms("Hz45RJ5uukSfyOEv3wNxwA==");
        console.log("response.data", response.data);
        setTerms(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados da política:", error);
      }
    };

    fetchTerms();
  }, []);

  return (
    <>
      <Seo
        title="Termos de Uso"
        description="Termos de Uso do Aplicativo Líder da Associação Brasileira de Ontopsicologia"
      />
     <Container>
        <Title>Termos de Uso do do Aplicativo Líder</Title>
        <Content>
          {terms ? (
            <div dangerouslySetInnerHTML={{ __html: terms.termos }} />
          ) : (
            "Carregando termos..."
          )}
        </Content>
      </Container>
    </>
  );
};

export default Termos;
