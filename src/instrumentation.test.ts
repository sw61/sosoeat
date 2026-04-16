const captureRequestError = jest.fn();
const serverConfigLoaded = jest.fn();
const edgeConfigLoaded = jest.fn();

jest.mock('@sentry/nextjs', () => ({
  captureRequestError: (...args: unknown[]) => captureRequestError(...args),
}));

jest.mock('../sentry.server.config', () => {
  serverConfigLoaded();
  return {};
});

jest.mock('../sentry.edge.config', () => {
  edgeConfigLoaded();
  return {};
});

describe('src/instrumentation.ts', () => {
  const originalRuntime = process.env.NEXT_RUNTIME;

  beforeEach(() => {
    jest.resetModules();
    serverConfigLoaded.mockClear();
    edgeConfigLoaded.mockClear();
  });

  afterAll(() => {
    process.env.NEXT_RUNTIME = originalRuntime;
  });

  it('loads the server config in the nodejs runtime', async () => {
    process.env.NEXT_RUNTIME = 'nodejs';

    const { register } = await import('./instrumentation');
    await register();

    expect(serverConfigLoaded).toHaveBeenCalledTimes(1);
    expect(edgeConfigLoaded).not.toHaveBeenCalled();
  });

  it('loads the edge config in the edge runtime', async () => {
    process.env.NEXT_RUNTIME = 'edge';

    const { register } = await import('./instrumentation');
    await register();

    expect(edgeConfigLoaded).toHaveBeenCalledTimes(1);
    expect(serverConfigLoaded).not.toHaveBeenCalled();
  });

  it('re-exports Sentry.captureRequestError', async () => {
    const instrumentationModule = await import('./instrumentation');
    const args: [Record<string, unknown>, Record<string, unknown>, Record<string, unknown>] = [
      { request: 'value' },
      { error: 'value' },
      { context: 'value' },
    ];

    instrumentationModule.onRequestError(
      ...(args as Parameters<typeof instrumentationModule.onRequestError>)
    );

    expect(captureRequestError).toHaveBeenCalledWith(...args);
  });
});
