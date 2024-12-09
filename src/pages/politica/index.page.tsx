import { useEffect, useState } from "react";
import { policyTerms } from "../../services/politica";
import Seo from "../../components/Seo";
import { Container, Content, Title } from "./styles";

interface PolicyData {
  termos: string;
}

const Politica = () => {
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  console.log("oi");
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await policyTerms("Hz45RJ5uukSfyOEv3wNxwA==");
        console.log("response.data", response.data);
        setPolicy(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados da política:", error);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <>
      <Seo
        title="Politica de Privacidade "
        description="Politica de Privacidade Aplicativo Líder da Associação Brasileira de Ontopsicologia"
      />
     <Container>
        <Title>Política de Privacidade do Aplicativo Líder</Title>
        <Content>
          {policy ? (
            <div dangerouslySetInnerHTML={{ __html: policy.termos }} />
          ) : (
            "Carregando termos..."
          )}
        </Content>
      </Container>
    </>
  );
};

export default Politica;
