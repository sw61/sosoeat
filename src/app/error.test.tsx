import type { ImgHTMLAttributes } from 'react';

import { render, waitFor } from '@testing-library/react';

import ErrorPage from './error';

const captureException = jest.fn();

jest.mock('@sentry/nextjs', () => ({
  captureException: (...args: unknown[]) => captureException(...args),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    priority: _priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
    //eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('app/error.tsx', () => {
  beforeEach(() => {
    captureException.mockClear();
  });

  it('calls Sentry.captureException with the error prop', async () => {
    const error = new Error('app route error');

    render(<ErrorPage error={error} reset={jest.fn()} />);

    await waitFor(() => {
      expect(captureException).toHaveBeenCalledWith(error);
    });
  });
});
