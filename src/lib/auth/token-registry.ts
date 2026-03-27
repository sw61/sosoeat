export interface IAuthTokenProvider {
  getAccessToken(): Promise<string | null> | string | null;
  setAccessToken(token: string): Promise<void> | void;
}

/**
 * [Library] TokenProviderRegistry
 * 인증 토큰을 가져오는 구체적인 방식(Zustand, CookieStorage 등)을
 * 주입받아 사용하는 레지스트리입니다. (DIP 구현 핵심)
 */
let clientProvider: IAuthTokenProvider | null = null;
let serverProvider: IAuthTokenProvider | null = null;

export const TokenProviderRegistry = {
  setClientProvider(provider: IAuthTokenProvider) {
    clientProvider = provider;
  },

  setServerProvider(provider: IAuthTokenProvider) {
    serverProvider = provider;
  },

  get client() {
    if (!clientProvider) {
      // 초기화 전 예외 처리 또는 기본 동작 정의
      return {
        getAccessToken: () => null,
        setAccessToken: () => {},
      };
    }
    return clientProvider;
  },

  get server() {
    if (!serverProvider) {
      throw new Error('ServerTokenProvider is not registered.');
    }
    return serverProvider;
  },
};
