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

/**
 * Tenta abrir o app no caminho informado (ex: "conteudos/podcasts/meu-slug").
 * Se o app nao estiver instalado, direciona para a loja.
 *
 * Obs: quando os App Links (Android) / Universal Links (iOS) estao verificados,
 * o sistema abre o app direto e esta pagina nem chega a carregar. Este codigo
 * cobre o caso em que o link caiu no navegador (app nao instalado, link aberto
 * dentro de webview de outro app, etc).
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
    // Tenta o esquema customizado; se o app abrir, a pagina fica oculta e
    // o timer e cancelado. Caso contrario, segue para a App Store.
    let saiuDaPagina = false;
    const onVisibility = () => {
      if (document.hidden) saiuDaPagina = true;
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onVisibility);

    window.location.href = `${APP_SCHEME}://${caminho}`;

    setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onVisibility);
      if (!saiuDaPagina && !document.hidden) {
        window.location.href = APP_STORE_URL;
      }
    }, 1800);
    return plataforma;
  }

  return plataforma;
}
