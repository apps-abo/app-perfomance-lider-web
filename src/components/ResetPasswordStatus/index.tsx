import Seo from "../Seo";
import TrocaImagensAutomatica from "../SliderImage";
import Image from "next/image";
import {
  Bloco,
  Flex,
  Page,
  Text,
  DivLink
} from "./styles";

export enum ResetPasswordStatus {
  InvalidLink,
  Success,
}

interface ResetPasswordPageProps {
  status: ResetPasswordStatus;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ status }) => {
  const getTitle = () => {
    switch (status) {
      case ResetPasswordStatus.InvalidLink:
        return "Link de Recuperação de Senha Inválido";
      case ResetPasswordStatus.Success:
        return "Sua senha foi redefinida com sucesso!";
      default:
        return "";
    }
  };

  const getDescription = () => {
    switch (status) {
      case ResetPasswordStatus.InvalidLink:
        return "Gere um novo link por favor!";
      case ResetPasswordStatus.Success:
        return "";
      default:
        return "";
    }
  };

  return (
    <>
      <Seo
        title="Redefinição de Senha"
        description="Pagina para realizar redefinição de senha  do aplicativo Líder da Associação Brasileira de Ontopsicologia"
      />
      <Page>
        <TrocaImagensAutomatica />
        <Bloco>
          <Flex>
            <Image
              src="/images/Favico-AppLider2023.png"
              alt="Descrição da imagem"
              width={85}
              height={80}
              style={{ borderRadius: "10px" }}
            />
            <DivLink>
              <h1>{getTitle()}</h1>
              <p>{getDescription()}</p>
              {status === ResetPasswordStatus.InvalidLink && (
                <p>
                  Mais informações entre em contato via{" "}
                  <a href="https://api.whatsapp.com/send?phone=555599136380&text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20suporte%20do%20aplicativo%20L%C3%ADder">
                    WhatsApp.
                  </a>
                </p>
              )}
            </DivLink>
          </Flex>
          <Text>
            <p>
              Desenvolvido por Imago Dev | © Associação Brasileira de
              Ontopsicologia
            </p>
          </Text>
        </Bloco>
      </Page>
    </>
  );
};

export default ResetPasswordPage;
