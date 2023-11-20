import Image from "next/image";
import Seo from "@/components/Seo";
import TrocaImagensAutomatica from "@/components/SliderImage";
import { Card } from "@mui/material";
import { DivLinkValid, FlexWrap, MainPage, TextDev } from "./styles";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <>
      <Seo
        title="Redefinição de Senha"
        description="Pagina para realizar redefinição de senha do aplicativo Líder da Associação Brasileira de Ontopsicologia"
      />
      <MainPage>
        <TrocaImagensAutomatica />
        <Card>
          <FlexWrap>
            <Image
              src="/images/Favico-AppLider2023.png"
              alt="Descrição da imagem"
              width={85}
              height={80}
              style={{ borderRadius: "10px" }}
            />
            <DivLinkValid>
              <h1>Link de Recuperação de Senha Inválido</h1>
              <p>Gere um novo link por favor!</p>
            </DivLinkValid>
          </FlexWrap>
          <TextDev>
            <p>
              Desenvolvido por Imago Dev | © Associação Brasileira de Ontopsicologia
            </p>
          </TextDev>
        </Card>
      </MainPage>
    </>
  );
}

