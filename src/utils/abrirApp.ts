const ANDROID_PACKAGE = "br.com.performancelider.applider";
const APP_SCHEME = "mobile-app-lider";

export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
export const APP_STORE_URL = "https://apps.apple.com/br/app/l%C3%ADder/id1446222661";
export const APP_STORE_ID = "1446222661";

export type Plataforma = "android" | "ios" | "desktop";

export function detectarPlataforma(): Plataforma {
  const userAgent = navigator.userAgent || navigator.vendor;
  if (/android/i.test(userAgent)) return "android";
  // iPadOS 13+ se identifica como Mac; o touch diferencia
  const isIpadOS = /Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1;
  if (/iPad|iPhone|iPod/.test(userAgent) || isIpadOS) return "ios";
  return "desktop";
}

export function urlDaLoja(plataforma: Plataforma): string | null {
  if (plataforma === "android") return PLAY_STORE_URL;
  if (plataforma === "ios") return APP_STORE_URL;
  return null;
}

/** Abre o app pelo esquema customizado (mobile-app-lider://...). */
export function abrirPeloEsquema(path: string) {
  window.location.href = `${APP_SCHEME}://${path.replace(/^\/+/, "")}`;
}

/**
 * Tenta abrir o app no caminho informado (ex: "conteudos/podcasts/meu-slug").
 *
 * Obs: quando os App Links (Android) / Universal Links (iOS) estao verificados,
 * o sistema abre o app direto e esta pagina nem chega a carregar. Este codigo
 * cobre o caso em que o link caiu no navegador (app nao instalado, link colado
 * na barra de endereco, webview de outro app, etc).
 *
 * No iOS NAO redirecionamos para a loja automaticamente: o Safari costuma
 * bloquear a abertura do esquema customizado sem um toque do usuario, e o
 * usuario que ja tem o app acabava indo parar na App Store. Em vez disso a
 * pagina mostra os botoes "Abrir no app" e "Baixar na loja".
 */
export function abrirApp(path: string): Plataforma {
  const plataforma = detectarPlataforma();
  const caminho = path.replace(/^\/+/, "");

  if (plataforma === "android") {
    // Formato correto de intent URL: intent://<path>#Intent;scheme=...;package=...;S.browser_fallback_url=...;end
    // Se o app nao estiver instalado, o Chrome abre o fallback (Play Store).
    const fallback = encodeURIComponent(PLAY_STORE_URL);
    window.location.href = `intent://${caminho}#Intent;scheme=${APP_SCHEME};package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
    return plataforma;
  }

  if (plataforma === "ios") {
    abrirPeloEsquema(caminho);
    return plataforma;
  }

  return plataforma;
}
