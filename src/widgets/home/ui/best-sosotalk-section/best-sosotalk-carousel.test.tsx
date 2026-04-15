/* eslint-disable @next/next/no-img-element */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { BestSosotalkCarousel } from './best-sosotalk-carousel';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill: _fill,
    ...props
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const posts = [
  {
    id: 1,
    title: 'First post',
    content: 'First post body',
    imageUrl: 'https://example.com/post-1.jpg',
    authorName: 'Soso',
    authorImageUrl: 'https://example.com/author-1.jpg',
    likeCount: 3,
    commentCount: 2,
    createdAt: '1 hour ago',
  },
  {
    id: 2,
    title: 'Second post',
    content: 'Second post body',
    imageUrl: 'https://example.com/post-2.jpg',
    authorName: 'Dada',
    authorImageUrl: 'https://example.com/author-2.jpg',
    likeCount: 5,
    commentCount: 1,
    createdAt: '2 hours ago',
  },
];

describe('BestSosotalkCarousel', () => {
  it('does not block link clicks on cards', () => {
    render(<BestSosotalkCarousel posts={posts} />, {
      wrapper: createWrapper(),
    });

    const link = screen.getByRole('link', { name: /First post/ });

    fireEvent.pointerDown(link, { button: 0, clientX: 100, isPrimary: true });

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const wasNotPrevented = link.dispatchEvent(clickEvent);

    expect(wasNotPrevented).toBe(true);
    expect(link).toHaveAttribute('href', '/sosotalk/1');
  });
});
