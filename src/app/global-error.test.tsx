import { render, screen, waitFor } from '@testing-library/react';

import GlobalError from './global-error';

const captureException = jest.fn();

jest.mock('@sentry/nextjs', () => ({
  captureException: (...args: unknown[]) => captureException(...args),
}));

jest.mock('next/error', () => ({
  __esModule: true,
  default: ({ statusCode }: { statusCode: number }) => <div>NextError:{statusCode}</div>,
}));

describe('app/global-error.tsx', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    captureException.mockClear();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders the fallback UI and captures the error', async () => {
    const error = new Error('root layout error');

    render(<GlobalError error={error} />);

    expect(screen.getByText('NextError:0')).toBeInTheDocument();

    await waitFor(() => {
      expect(captureException).toHaveBeenCalledWith(error);
    });
  });
});
